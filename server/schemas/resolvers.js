const { AuthenticationError } = require("apollo-server-express");
const { User, Stock, Machine, Job } = require("../models");
const { where } = require("../models/job");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    // Find Job
    Job: async () => {
      return await Job.find();
    },
    getJobById: async (parent, args) => {
      return Job.findById(args._id);
    },

    // Find Stock
    Stock: async () => {
      return await Stock.find();
    },
    getStockById: async (parent, args) => {
      return await Stock.findById(args._id);
    },
    getStockByQuantity: async () => {
      return await Stock.find(where(quantity <= "3"));
    },

    // Find Machines
    Machine: async () => {
      return await Machine.find();
    },
    getMachineById: async (parent, args) => {
      return await Machine.findById(args._id);
    },

    //Find Users
    User: async () => {
      return await User.find();
    },
    getUserById: async () => {
      return await User.findOne({ _id });
    },
  },
  Mutation: {
    // Stock
    addStock: async (parent, { name, stockType, quantity, size, grit }) => {
      const stock = await Stock.create({
        name,
        stockType,
        quantity,
        size,
        grit,
      });
      return stock;
    },
    updateStock: async (
      parent,
      { _id, name, stockType, quantity, size, grit }
    ) => {
      return await Stock.findOneAndUpdate({
        _id: _id,
        name: name,
        stockType: stockType,
        quantity: quantity,
        size: size,
        grit: grit,
      });
    },
    deleteStock: async (parent, { _id }) => {
      return Stock.findOneAndDelete({ _id: _id });
    },

    // Job
    addJob: async function (
      parent,
      {
        siteAddress,
        jobDescription,
        builderName,
        contact,
        contactNumber,
        startDate,
        endDate,
        createdAt,
        meterage,
      }
    ) {
      const job = await Job.create({
        siteAddress,
        jobDescription,
        builderName,
        contact,
        contactNumber,
        startDate,
        endDate,
        createdAt,
        meterage,
      });
      return job;
    },
    updateJob: async (
      parent,
      {
        _id,
        siteAddress,
        jobDescription,
        builderName,
        contact,
        contactNumber,
        startDate,
        endDate,
        meterage,
      }
    ) => {
      return await Job.findOneAndUpdate(
        { _id: _id },
        {
          siteAddress,
          jobDescription,
          builderName,
          contact,
          contactNumber,
          startDate,
          endDate,
          meterage,
        },
        { new: true }
      );
    },
    deleteJob: async (parent, { _id }) => {
      return Job.findOneAndDelete({ _id: _id });
    },

    // Machine
    addMachine: async (parent, { name, modelNumber }) => {
      const machine = await Machine.create({ name, modelNumber });
      return machine;
    },

    // User
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
