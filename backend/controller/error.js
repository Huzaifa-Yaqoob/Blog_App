const pageNotFound = {
    message: "Page Not Found"
};

const error = (req, res, next) => {
    res.status(404).send(pageNotFound);
    next();
}

module.exports = error;