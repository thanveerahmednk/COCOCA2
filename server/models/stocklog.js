'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stocklog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stocklog.init(
    {
      stock_log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      stock_log_ip: DataTypes.STRING,
      stock_log_status: DataTypes.INTEGER,
      stock_log_type: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_log_in_out: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
     
      stock_log_product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_log_qty:{
       allowNull:false,
       type:DataTypes.STRING,
      },
      stock_log_producy_qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_log_current_qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_log_product_cost: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock_log_activity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      stock_log_branch: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'stocklog',
      tableName: 'tbl_stock_log',
      freezeTableName: true,
    }
  );
  stocklog.associate = function (models) {
    // associations can be defined here
    stocklog.belongsTo(models.User, {
      foreignKey: 'createdBy',
      
    });
    stocklog.belongsTo(models.product, {
        foreignKey: 'stock_log_product_id',
        targetKey: 'product_id',
      });
      stocklog.belongsTo(models.Branch, {
        foreignKey: 'stock_log_branch',
        targetKey: 'branch_id',
      });
  };
  return stocklog;
};