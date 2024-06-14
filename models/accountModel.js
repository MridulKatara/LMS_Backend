module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountRole: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false,
    },
  });

  return Account;
};
