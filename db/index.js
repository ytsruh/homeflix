"use strict";
const Sequelize = require("sequelize");

//Create new sequelize object
var sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // disable logging; default: console.log
    logging: false,
    dialectOptions: {
      //tedious/mssql specific options
      options: {
        encrypt: true,
      },
    },
    define: {
      timestamps: true,
    },
  }
);

//Import models
const Movie = require("./models/movie")(sequelize, Sequelize);
const Show = require("./models/show")(sequelize, Sequelize);
const Episode = require("./models/episode")(sequelize, Sequelize);

//Create relationships by calling the associate functions
Show.associate(Episode);
Episode.associate(Show);

//Connect to DB. Force = true will delete and create new tables at each restart
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection to Azure SQL has been established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  sequelize,
  Sequelize,
};
