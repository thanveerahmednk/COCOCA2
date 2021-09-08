'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.supplier, {
        foreignKey: 'supplier_state_id',
      });
    }
  }
  State.init(
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
      state_id_wrt_tax: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'State',
      tableName: 'states',
      freezeTableName: true,
    }
  );
  return State;
};