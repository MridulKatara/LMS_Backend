module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define("Progress", {
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Progress;
};
