"use strict";
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    "Show",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageName: {
        type: DataTypes.STRING
      }
    },
    { timestamps: true }
  );
  Show.associate = model => {
    // Create relationship to the model passed into the function
    Show.hasMany(model); // Show will get the accessors getEpisodes and setEpisodes
  };
  return Show;
};
