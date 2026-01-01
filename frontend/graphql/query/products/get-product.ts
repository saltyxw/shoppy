import { gql } from "@apollo/client";
export const GET_ARTICLE = gql`
  query {
    product(id: 14) {
      id
      name
      description
      price
      quantity
      medias {
        imageUrl
        videoUrl
        orderPosition
      }
      categories {
        category {
          id
          name
        }
      }
      reviews {
        rating
        text
        userId
        createdAt
      }
    }
  }
`;
