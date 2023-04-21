const { decodeToken } = require("../controller/jwt");

const authenticateToken = ((req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(404).send({authentication: "You are not logged In"});
    }
    const tokken = authorization.split(" ")[1];
    try {
        req.userId = decodeToken(tokken);
        next();
    } catch (error) {
        res.status(404).send({authentication: "You are not logged In"});
    }
});

module.exports = { authenticateToken };