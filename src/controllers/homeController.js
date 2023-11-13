const getIndex = (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  };

  module.exports = {getIndex}