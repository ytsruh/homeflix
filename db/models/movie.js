"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1500),
        allowNull: false
      },
      releaseYear: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.STRING
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageName: {
        type: DataTypes.STRING
      }
    },
    { timestamps: true }
  );
  Movie.associate = models => {
    // associations can be defined here
  };
  return Movie;
};
