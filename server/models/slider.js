'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slider.init(
    {
      slider_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      slider_ip: DataTypes.STRING,
      slider_status: DataTypes.INTEGER,
      slider_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      slider_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      slider_web_image: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      slider_mob_image: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
     slider_category_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
     },
     slider_type:{
        allowNull: false,
        type: DataTypes.INTEGER,
     },
      slider_is_active: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'slider',
      tableName: 'tbl_slider',
      freezeTableName: true,
    }
  );
  slider.associate = function (models) {
    // associations can be defined here
    slider.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
slider.belongsTo(models.category, {
        foreignKey: 'slider_category_id',
        targetKey: 'category_id',
      });
  };
  return slider;
};