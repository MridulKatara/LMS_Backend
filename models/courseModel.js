module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Course;
};
