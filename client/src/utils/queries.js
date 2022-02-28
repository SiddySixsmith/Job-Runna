import { gql } from "@apollo/client";

export const QUERY_JOB = gql`
  query job {
    Job {
      _id
      siteAddress
      jobDescription
      builderName
      contact
      contactNumber
      createdAt
      meterage
    }
  }
`;

export const QUERY_JOB_BY_ID = gql`
  query Query($id: ID) {
    getJobById(_id: $id) {
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

export const QUERY_STOCK = gql`
  query Stock {
    Stock {
      _id
      name
      stockType
      quantity
      size
      grit
    }
  }
`;

export const QUERY_STOCK_BY_ID = gql`
  query GetStockById($id: ID) {
    getStockById(_id: $id) {
      _id
      name
      stockType
      quantity
      size
      grit
    }
  }
`;

export const QUERY_MACHINE = gql`
  query Machine {
    Machine {
      name
      modelNumber
    }
  }
`;

export const QUERY_MACHINE_BY_ID = gql`
  query GetMachineById($id: ID) {
    getMachineById(_id: $id) {
      modelNumber
      name
    }
  }
`;

export const QUERY_USER = gql`
  query User {
    User {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;
