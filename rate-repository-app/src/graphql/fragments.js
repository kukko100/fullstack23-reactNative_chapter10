import { gql } from '@apollo/client';

export const ALL_FIELDS_FRAGMENT = gql`
  fragment AllFields on YourNodeType {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ratingAverage
    reviewCount
    reviews
    stargazersCount
    url
    user
    userHasReviewed
    watchersCount
  }
`;