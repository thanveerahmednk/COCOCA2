'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init(
    {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category_ip: DataTypes.STRING,
      category_status: DataTypes.INTEGER,
      category_name_english: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category_name_malayalam: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category_icon_svg: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
   
      category_is_active: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'category',
      tableName: 'tbl_product_category',
      freezeTableName: true,
    }
  );
  category.associate = function (models) {
    // associations can be defined here
    category.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
  };
  return category;
};