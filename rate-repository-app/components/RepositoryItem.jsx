import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import theme from '../theme';

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
    fontFamily: theme.fonts.main
  },
  description: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.main
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
    fontFamily: theme.fonts.main
  },
  languageButtonContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  languageButton: {
    backgroundColor: theme.colors.itemLanguageButton,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontFamily: theme.fonts.main
  }
});

const parseThousands = (num) => {
  if (num > 999) {
    const numFormattedInThousandsString = (num/1000).toFixed(1).toString() + "k"
    return numFormattedInThousandsString;
  }
  return num;
};

const RepositoryItem = ({ item }) => {
  return (
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
  );
};

export default RepositoryItem;
