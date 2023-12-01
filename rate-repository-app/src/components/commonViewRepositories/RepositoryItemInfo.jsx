import { View, Text, StyleSheet, FlatList, Pressable, Image, Linking } from "react-native"
import theme from "../../utils/theme";
import { useLocation } from 'react-router-native';
import format from 'date-fns/format';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY_BY_ID } from "../../graphql/queries";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 100
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 300,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginTop: 10,
  },
  detail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  languageButtonContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  gitHubLinkButtonContainer: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
  languageButton: {
    backgroundColor: theme.colors.itemLanguageButton,
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  gitHubLinkButton: {
    backgroundColor: theme.colors.itemLanguageButton,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center' 
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: theme.colors.itemLanguageButton,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewDetailsContainer: {
    flex: 1, // Take remaining space
  },
  ratingText: {
    fontWeight: 'bold',
    color: theme.colors.itemLanguageButton,
  },
  createdAt: {
    color: '#586069',
  },
  separator: {
    height: 2,
    backgroundColor: "lightgrey"
  },
});

const parseThousands = (num) => {
  if (num > 999) {
    const numFormattedInThousandsString = (num/1000).toFixed(1).toString() + "k"
    return numFormattedInThousandsString;
  }
  return num;
};

const RepositoryInfo = ({ repository }) => {

  const openGitHubLink = async () => {
    const gitHubUrl = repository.url;

    try {
      Linking.openURL(gitHubUrl);
      console.log(gitHubUrl);
    } catch (error) {
      console.log('Error opening GitHub link: ', error);
    }
  }

  return (
    <View>

      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.title}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <View style={styles.languageButtonContainer}>
            <Text style={styles.languageButton}>
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{parseThousands(repository.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{parseThousands(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{parseThousands(repository.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{parseThousands(repository.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      
      <Pressable onPress={openGitHubLink}>
        <View style={styles.gitHubLinkButtonContainer}>
          <Text style={styles.gitHubLinkButton}>
            Open in GitHub
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewContainer}>
       <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewDetailsContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.createdAt}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryItemInfo = () => {
  const location = useLocation();
  const { item } = location.state;

  const { data, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: {
      repositoryId: item.id,
      first: 5,  // Initial number of reviews to fetch
      after: null,  // Initial cursor
    },
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleEndReached = () => {
    if (data?.repository?.reviews?.pageInfo?.hasNextPage) {
      setLoadingMore(true);
      console.log("end reached, loading more")

      fetchMore({
        variables: {
          id: item.id,
          first: 1,
          after: data.repository.reviews.pageInfo.endCursor,
        },
      }).then(() => {
        setLoadingMore(false);
      });
    } else {
      console.log("no more items to load")
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.repository?.reviews?.edges.map((edge) => edge.node) || []}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default RepositoryItemInfo;