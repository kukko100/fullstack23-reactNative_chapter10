import { gql } from 'graphql-tag';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        cursor
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
          url
          reviews(first: 5) {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    }
  }`;

export const GET_REPOSITORIES_FILTERED = gql`
  query ($searchKeyword: String) {
    repositories (searchKeyword: $searchKeyword) {
      edges {
        cursor
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
          url
          reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query ($repositoryId: ID!) {
    repository (id: $repositoryId) {
      fullName
      id
      name
      ownerName
      ownerAvatarUrl
      language
      forksCount
      description
      createdAt
      reviewCount
      ratingAverage
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }`;

export const GET_CURRENT_USER_REVIEWS = gql`
  query {
    me {
      reviews {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              name
              ownerName
              id
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;




  

