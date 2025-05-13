const { DataTypes } = require('sequelize');
const sequelize = require('./databese')


module.exports = sequelize;
const Player = sequelize.define("player", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = Player;