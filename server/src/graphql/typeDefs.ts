import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    created_at: String!
    updated_at: String!
  }

  type Location {
    id: ID!
    name: String!
    address: String!
    postal_code: String!
    created_at: String!
    updated_at: String!
  }

  type Tag {
    id: ID!
    name: String!
    created_at: String!
  }

  type Dish {
    id: ID!
    name: String!
    description: String
    price: Float!
    portion_size: String!
    location: Location!
    tags: [Tag!]!
    ratings: [Rating!]!
    created_at: String!
    updated_at: String!
  }

  type Rating {
    id: ID!
    dish: Dish!
    user: User!
    taste_rating: Int!
    portion_rating: Int!
    presentation_rating: Int!
    notes: String
    created_at: String!
    updated_at: String!
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
  }

  input CreateDishInput {
    name: String!
    description: String
    price: Float!
    portion_size: String!
    location_id: ID!
    tag_ids: [ID!]
  }

  input UpdateDishInput {
    name: String
    description: String
    price: Float
    portion_size: String
    location_id: ID
    tag_ids: [ID!]
  }

  input CreateRatingInput {
    dish_id: ID!
    taste_rating: Int!
    portion_rating: Int!
    presentation_rating: Int!
    notes: String
  }

  input UpdateRatingInput {
    taste_rating: Int
    portion_rating: Int
    presentation_rating: Int
    notes: String
  }

  input DishFilter {
    search: String
    location_id: ID
    tag_ids: [ID!]
    min_price: Float
    max_price: Float
    min_rating: Float
  }

  type Query {
    getUser(id: ID!): User
    getDish(id: ID!): Dish
    getDishes(filter: DishFilter): [Dish!]!
    getLocation(id: ID!): Location
    getLocations: [Location!]!
    getTags: [Tag!]!
    searchDishes(query: String!): [Dish!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    createDish(input: CreateDishInput!): Dish!
    updateDish(id: ID!, input: UpdateDishInput!): Dish!
    createRating(input: CreateRatingInput!): Rating!
    updateRating(id: ID!, input: UpdateRatingInput!): Rating!
    deleteRating(id: ID!): Boolean!
  }
`;
