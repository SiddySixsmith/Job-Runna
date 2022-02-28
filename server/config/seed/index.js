const db = require("../connection");
const { Product, Machine, Job, User } = require("../../models");
const { productSeed } = require("./productSeed");
const { machineSeed } = require("./machineSeed");
const { jobSeed } = require("./jobSeed");

db.once("open", async () => {
  // product seeding
  await Product.deleteMany();
  // await Product.insertMany(productSeed);
  // console.log("Products Seeded");

  //Machine Seeding
  await Machine.deleteMany();
  // await Machine.insertMany(machineSeed);
  // console.log("Machines Seeded");

  //Job seeding
  await Job.deleteMany();
  // let products = await Product.find();
  // let machines = await Machine.find();

  // let seedJobs = jobSeed.map((job) => {
  //   const p = products.find((product) => product.name === job.product);
  //   const m = machines.find((machine) => machine.name === job.machine);
  //   return { ...job, product: p._id, machine: m._id };
  // });
  // await Job.collection.insertMany(seedJobs);
  // await jobSeed.insertMany(jobSeed);
  console.log("Jobs Seeded");

  //User seeding
  await User.deleteMany();

  process.exit();

});
