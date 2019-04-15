const AbstractRank = require("./AbstractRank");
const models = require("../../models");
const User = models.user;
const UserDetail = models.userdetails;

module.exports = class LevelRank extends AbstractRank {
  constructor() {
    super();
  }

  /**
   * update
   */
  async update() {
    //get top 10 from database
    await UserDetail.findAll({
      order: [["level", "DESC"]],
      limit: 10,
      include: [{ model: models.user }]
    })
      .then(data => {
        this.top10 = data;
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  /**
   * get top 10 from database
   */
  getTop10() {
    return this.top10;
  }

  getPositionById(id) {
    return UserDetail.findAll({attributes: ["user_id", "level", "exp"], order: [["level", "DESC"]] })
      .then(data => {
        let pos = 1;
        for (let i = 0; i < data.length; i++) {
          let currentId = data[i].dataValues.user_id;
          if (currentId === id) {
            break;
          }
          pos++;
        }
        console.log(pos);
        return 4;
      })
      .catch(reason => {
        console.log(reason);
      });
  }

};
