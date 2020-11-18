"use strict";
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    "Episode",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      season: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(2000)
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: true }
  );
  Episode.associate = model => {
    // Create relationship to the model passed into the function
    Episode.belongsTo(model);
  };
  return Episode;
};
