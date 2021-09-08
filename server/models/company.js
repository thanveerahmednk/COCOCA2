'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Company.init({
    name: DataTypes.STRING,
    shortCode: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    designation: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    landLineNumber: DataTypes.STRING,
    mobile: DataTypes.STRING,
    pincode: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    gstin: DataTypes.STRING,
    panNumber: DataTypes.STRING,
    cinNumber: DataTypes.STRING,
    tdsNumber: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    isListed: DataTypes.STRING,
    status: DataTypes.INTEGER,
    company_ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};