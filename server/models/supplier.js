'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  supplier.init(
    {
     supplier_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      supplier_ip: DataTypes.STRING,
      supplier_status: DataTypes.INTEGER,
      supplier_name_en: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      supplier_contact_person: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      supplier_contact_primary: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      supplier_contact_alternative: {
        allowNull: false,
        type: DataTypes.STRING,
      },
     supplier_email:{
        allowNull: false,
        type: DataTypes.STRING,
     },
     supplier_address:{
        allowNull: false,
        type: DataTypes.TEXT,
     },
      supplier_state_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      supplier_trn:{
        allowNull: false,
        type: DataTypes.STRING,
     },
     supplier_account_no:{
        allowNull: false,
        type: DataTypes.STRING,
     },
      supplier_bank_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      supplier_branch_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      supplier_gst: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'supplier',
      tableName: 'tbl_supplier',
      freezeTableName: true,
    }
  );
  supplier.associate = function (models) {
    // associations can be defined here
    supplier.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    supplier.belongsTo(models.State, {
      foreignKey: 'supplier_state_id',
    
    });
  };
  return supplier;
};