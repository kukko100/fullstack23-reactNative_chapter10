import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import theme from '../../utils/theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
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
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center', // Align items horizontally
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewDetailsContainer: {
    flex: 1, // Take remaining space
  },
  ratingText: {
    fontWeight: 'bold',
    color: 'white',
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

const RepositoryItem = ({ item, fetchMore }) => {
  const navigate = useNavigate();

  const handleSingleView = () => {
    console.log("asdf")
    navigate('/singleView', { state: { item } });
  }

  return (
    <Pressable onPress={handleSingleView}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.title}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.languageButtonContainer}>
              <Text style={styles.languageButton}>
                {item.language}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{parseThousands(item.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{parseThousands(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{parseThousands(item.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{parseThousands(item.ratingAverage)}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
    
  );
};

export default RepositoryItem;
