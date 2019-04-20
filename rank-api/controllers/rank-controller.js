const LevelRank = require("../models/LevelRank");
const rank = new LevelRank();

exports.getLevelRank = function(req, res) {
  console.log(req.user);
  rank.update().then(async () => {
    res.send({
      top10: rank.getTop10(),
      position: await rank.getPositionById(1)
    });
  });
}; 