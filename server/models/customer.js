'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      customer.hasMany(models.vieworder, {
        foreignKey: 'o_customer_id',
      });
    }
    }
  
  customer.init(
    {
        customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customer_ip: DataTypes.STRING,
      customer_status: DataTypes.INTEGER,
      customers_from: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customer_unique_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_contact_number: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customer_email_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      customer_area_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customer_android_version: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_android_token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_web_token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_wallet_amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
     
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'customer',
      tableName: 'tbl_customer',
      freezeTableName: true,
    }
  );
  customer.associate = function (models) {
    // associations can be defined here
    customer.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
   
  
 

  };
  


  return customer;
};