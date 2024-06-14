const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeInstance = new Sequelize(process.env.DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

// Import models
db.Account = require("./accountModel")(sequelizeInstance, Sequelize);
db.Curriculum = require("./curriculumModel")(sequelizeInstance, Sequelize);
db.Module = require("./moduleModel")(sequelizeInstance, Sequelize);
db.Tracking = require("./trackingModel")(sequelizeInstance, Sequelize);

// Define relationships
db.Curriculum.hasMany(db.Module, { onDelete: "CASCADE" });
db.Module.belongsTo(db.Curriculum);

db.Account.belongsToMany(db.Curriculum, { through: db.Tracking });
db.Curriculum.belongsToMany(db.Account, { through: db.Tracking });

module.exports = db;
