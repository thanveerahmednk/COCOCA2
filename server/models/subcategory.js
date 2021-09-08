'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subcategory.init(
    {
      subcategory_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subcategory_ip: DataTypes.STRING,
      subcategory_status: DataTypes.INTEGER,
      subcategory_name_english: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      subcategory_name_malayalam: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      sub_image_name: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      
      subcategory_is_active: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'subcategory',
      tableName: 'tbl_subcategory',
      freezeTableName: true,
    }
  );
  subcategory.associate = function (models) {
    // associations can be defined here
    subcategory.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    subcategory.belongsTo(models.category,{
        foreignKey:'category_id',
        targetKey:'category_id'
    })
  };
  return subcategory;
};