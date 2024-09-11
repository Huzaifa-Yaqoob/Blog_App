const fs = require("fs");

const deletePic = (picName) => {
  if (picName.includes("unknown")) {
    return;
  }
  fs.unlink(`uploads/${picName}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = deletePic;
