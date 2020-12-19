const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class City extends Model {

    toString() {
        return `${this.title}, ${this.description}`;
    }
};

City.init(
    {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    },
    {
        sequelize,
        tableName: 'city'
    }
)

module.exports = City;