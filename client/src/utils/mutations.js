import { gql } from "@apollo/client";

// User
export const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      User {
        firstName
        lastName
        password
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      User {
        firstName
        lastName
        email
      }
    }
  }
`;

// Machine
export const ADD_MACHINE = gql`
  mutation AddMachine($name: String!, $modelNumber: String!) {
    addMachine(name: $name, modelNumber: $modelNumber) {
      name
      modelNumber
    }
  }
`;

// Job
export const ADD_JOB = gql`
  mutation AddJob(
    $jobDescription: String!
    $siteAddress: String
    $builderName: String
    $contact: String
    $contactNumber: String
    $startDate: String
    $endDate: String
    $createdAt: String
    $meterage: String
  ) {
    addJob(
      jobDescription: $jobDescription
      siteAddress: $siteAddress
      builderName: $builderName
      contact: $contact
      contactNumber: $contactNumber
      startDate: $startDate
      endDate: $endDate
      createdAt: $createdAt
      meterage: $meterage
    ) {
      _id
      siteAddress
      jobDescription
      builderName
      contact
      contactNumber
      startDate
      endDate
      createdAt
      meterage
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation Mutation(
    $jobDescription: String!
    $id: ID
    $siteAddress: String
    $builderName: String
    $contact: String
    $contactNumber: String
    $startDate: String
    $endDate: String
    $createdAt: String
    $meterage: String
  ) {
    updateJob(
      jobDescription: $jobDescription
      _id: $id
      siteAddress: $siteAddress
      builderName: $builderName
      contact: $contact
      contactNumber: $contactNumber
      startDate: $startDate
      endDate: $endDate
      createdAt: $createdAt
      meterage: $meterage
    ) {
      _id
      siteAddress
      jobDescription
      builderName
      contact
      contactNumber
      startDate
      endDate
      createdAt
      meterage
    }
  }
`;
export const DELETE_JOB = gql`
  mutation Mutation($id: ID) {
    deleteJob(_id: $id) {
      _id
      siteAddress
    }
  }
`;

// Stock
export const ADD_STOCK = gql`
  mutation AddStock(
    $name: String
    $stockType: String
    $quantity: Int
    $size: String
    $grit: String
  ) {
    addStock(
      name: $name
      stockType: $stockType
      quantity: $quantity
      size: $size
      grit: $grit
    ) {
      name
      stockType
      quantity
      size
      grit
    }
  }
`;

export const UPDATE_STOCK = gql`
  mutation Mutation($id: ID, $quantity: Int) {
    updateStockQauntity(_id: $id, quantity: $quantity) {
      _id
      name
      stockType
      quantity
      size
      grit
    }
  }
`;

export const REMOVE_STOCK = gql`
  mutation DeleteStock($id: ID) {
    deleteStock(_id: $id) {
      _id
      name
      stockType
      quantity
      size
      grit
    }
  }
`;
