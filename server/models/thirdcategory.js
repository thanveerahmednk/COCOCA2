'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thirdcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  thirdcategory.init(
    {
      thirdcategory_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      thirdcategory_ip: DataTypes.STRING,
      thirdcategory_status: DataTypes.INTEGER,
      thrdcate_name_english: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      thrdcate_name_malayalam: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      thrdcate_sub_category: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      third_cat_img: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      
      thrdcate_is_active: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'thirdcategory',
      tableName: 'tbl_third_level_category',
      freezeTableName: true,
    }
  );
  thirdcategory.associate = function (models) {
    // associations can be defined here
    thirdcategory.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    thirdcategory.belongsTo(models.subcategory,{
        foreignKey:'thrdcate_sub_category',
        targetKey:'subcategory_id'
    })
  };
  return thirdcategory;
};