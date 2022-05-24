const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Job {
    _id: ID
    siteAddress: String
    jobDescription: String
    builderName: String
    contact: String
    contactNumber: String
    startDate: String
    endDate: String
    createdAt: String
    meterage: String
  }

  type Stock {
    _id: ID
    name: String
    stockType: String
    quantity: String
    size: String
    grit: String
  }

  type Machine {
    _id: ID
    name: String
    modelNumber: String
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Auth {
    token: ID
    User: User
  }

  type Query {
    Job: [Job!]
    getJobById(_id: ID): Job
    Stock: [Stock]
    getStockByQuantity(quantity: String): [Stock]
    getStockById(_id: ID): Stock
    Machine: [Machine]
    getMachineById(_id: ID): Machine
    User: [User]
    getUserById(_id: ID): User
  }

  type Mutation {
    addUser(
      _id: ID
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addMachine(name: String!, modelNumber: String!): Machine
    addJob(
      siteAddress: String
      jobDescription: String
      builderName: String
      contact: String
      contactNumber: String
      startDate: String
      endDate: String
      createdAt: String
      meterage: String
    ): Job
    updateJob(
      _id: ID
      siteAddress: String
      jobDescription: String
      builderName: String
      contact: String
      contactNumber: String
      startDate: String
      endDate: String
      meterage: String
    ): Job
    deleteJob(_id: ID): Job
    addStock(
      name: String
      stockType: String
      quantity: String
      size: String
      grit: String
    ): Stock
    updateStock(
      _id: ID
      name: String
      stockType: String
      quantity: String
      size: String
      grit: String
    ): Stock
    deleteStock(_id: ID): Stock
  }
`;

module.exports = typeDefs;
