import { gql } from '@apollo/client';
import { ALL_FIELDS_FRAGMENT } from './fragments';

const YOUR_QUERY = gql`
  query Query {
    repositories {
      edges {
        node {
          ...${ALL_FIELDS_FRAGMENT}
        }
      }
    }
  }
`;