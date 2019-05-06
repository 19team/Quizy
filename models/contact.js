/**
 *
 * @param {Object} sequelize
 * @param {Object} Sequelize
 *
 */
module.exports = function(sequelize, Sequelize) {
  /**
   * model Question
   */
  var Contact = sequelize.define("contact", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    status: {
      type: Sequelize.STRING,
      notEmpty: true,
      defaultValue: "Waiting"
    },
    createAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("NOW()")
    }
  });
  return Contact;
};
