module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define("Module", {
    moduleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Module;
};
