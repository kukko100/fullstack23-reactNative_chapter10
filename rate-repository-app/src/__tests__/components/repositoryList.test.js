import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View, Text } from 'react-native';

const RepositoryListContainer = ({ repositories }) => {
  return (
    <View>
      {repositories.edges.map(({ node }) => (
        <View key={node.id} testID="repositoryItem">
          <Text>{node.fullName}</Text>
          <Text>{node.description}</Text>
          <Text>Language: {node.language}</Text>
          <Text>Forks: {node.forksCount}</Text>
          <Text>Stargazers: {node.stargazersCount}</Text>
          <Text>Rating: {node.ratingAverage}</Text>
          <Text>Reviews: {node.reviewCount}</Text>
        </View>
      ))}
    </View>
  );
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      expect(repositoryItems[0]).toHaveTextContent('jaredpalmer/formik');
      expect(repositoryItems[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(repositoryItems[0]).toHaveTextContent('TypeScript');
      expect(repositoryItems[0]).toHaveTextContent('1619');
      expect(repositoryItems[0]).toHaveTextContent('21856');
      expect(repositoryItems[0]).toHaveTextContent('88');
      expect(repositoryItems[0]).toHaveTextContent('3');
      
      expect(repositoryItems[1]).toHaveTextContent('async-library/react-async');
      expect(repositoryItems[1]).toHaveTextContent('Flexible promise-based React data loader');
      expect(repositoryItems[1]).toHaveTextContent('JavaScript');
      expect(repositoryItems[1]).toHaveTextContent('69');
      expect(repositoryItems[1]).toHaveTextContent('1760');
      expect(repositoryItems[1]).toHaveTextContent('72');
      expect(repositoryItems[1]).toHaveTextContent('3');
    });
  });
});
