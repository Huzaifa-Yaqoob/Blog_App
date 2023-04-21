const jwt = require("jsonwebtoken");

// Create token
const createToken = (id, maxAge) => {
    return jwt.sign({ id }, process.env.KEY, {
        expiresIn: maxAge
    });
}

// Decode Token
const decodeToken = (tokken) => {
    let userID = null;
    jwt.verify(tokken, process.env.KEY, (err, decodedToken ) => {
        if (err) {
            console.log(tokken);
            console.log(err);
            throw new Error("Tokken Missing");
        }else{
            userID = decodedToken.id;
        }
    });
    return userID;
}

module.exports = { createToken, decodeToken };