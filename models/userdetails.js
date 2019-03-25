var User = require("./user");
var sequelize = require("sequelize");
module.exports = function(sequelize, Sequelize) {
  /**
   * model UserDetails
   */
  var UserDetails = sequelize.define(
    "userdetails",
    {
      user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      level: {
        type: Sequelize.INTEGER
      },
      exp: {
        type: Sequelize.INTEGER
      },

      winMatchQuantity: {
        type: Sequelize.INTEGER
      },

      playedMatchQuantity: {
        type: Sequelize.INTEGER
      },

      trueQuizQuantity: {
        type: Sequelize.INTEGER
      },

      falseQuizQuantity: {
        type: Sequelize.INTEGER
      },

      trueQuizSeries: {
        type: Sequelize.INTEGER
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          User.hasOne(models.UserDetails, {
            foreignKey: "user_id",
            targetKy: "id"
          });
        }
      },
      instanceMethods: {
        addWinMatchQuantity: function() {
          this.winMatchQuantity++;
        },

        addPlayedMatchQuantity: function() {
          this.playedMatchQuantity++;
        },

        addTrueQuizQuantity: function() {
          console.log("Da tang so cau dung");
          this.trueQuizQuantity++;
        },

        addFalseQuizQuantity: function() {
          console.log("Da tang so cau sai");
          this.falseQuizQuantity++;
        },

        updateTrueQuizSeries: function(newSeries) {
          if (newSeries > this.trueQuizSeries) {
            this.trueQuizSeries = newSeries;
          }
        }
      }
    }
  );
  return UserDetails;
};
