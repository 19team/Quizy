const LevelRank = require("../models/LevelRank");
const rank = new LevelRank();

exports.getLevelRank = function(req, res) {
  rank.update().then(() => {
    res.send({
      top10: rank.getTop10(),
      position: rank.getPositionById(2)
    });
  });
};
