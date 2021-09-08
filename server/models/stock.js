'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock.init(
    {
      stock_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      stock_ip: DataTypes.STRING,
      stock_status: DataTypes.INTEGER,
     
     
      stock_item_product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_item_name:{
allowNull:false,
type:DataTypes.STRING,
      },
      stock_item_stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_item_cost: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
     
      stock_item_total_cost: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_item_branch: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'stock',
      tableName: 'tbl_stock',
      freezeTableName: true,
    }
  );
  stock.associate = function (models) {
    // associations can be defined here
    stock.belongsTo(models.User, {
      foreignKey: 'createdBy',
      
    });
    stock.belongsTo(models.product, {
        foreignKey: 'stock_item_product_id',
        targetKey: 'product_id',
      });
      stock.belongsTo(models.Branch, {
        foreignKey: 'stock_item_branch',
        targetKey: 'branch_id',
      });
  };
  return stock;
};