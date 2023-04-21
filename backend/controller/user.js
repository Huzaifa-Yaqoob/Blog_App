const { User } = require("./DB");
const validator = require("validator");
const { createToken } = require("./jwt"); 
const errorHandler = require("./errorHandler");
const getme = require("./getme"); 
const deletePic = require("./deletePic");

const maxAge = 3*24*60*60;


// Signing in user
const signup = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        const user = new User({email, name, password});
        const result = await user.save();
        const token = createToken(result._id, maxAge);
        const userData = await getme(result._id, token);
        res.send(userData);
    } catch (error) {
        const err = errorHandler(error);
        res.status(400).send(err);
    }
}

// Logging in user
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, maxAge);
        const userData = await getme(user._id, token);
        res.send(userData);
    } catch (error) {
        const err = errorHandler(error);
        res.status(400).send(err);
    }
}

// Update User
const update = async (req, res) => {
    try {
            const {email, name} = req.body;
            const { mimetype, filename } = req.file;
            const profilePic = filename;
            const allowedTypes = ['image/jpeg'];
            if (!allowedTypes.includes(mimetype)) {
                throw new Error("Image Error0");
            }
            if(!validator.isEmail(email)){
                throw new Error("Email Error1");
            }
            if (!validator.isAlpha(name)) {
                throw new Error("name Error1");
            }
            const _id = req.userId;
            const result = await User.findOneAndUpdate({ _id }, {email, name, profilePic});
            deletePic(result.profilePic);
            const token = createToken(_id, maxAge, {new: true});
            const userData = await getme(_id, token);
            res.send(userData);
    } catch (error) {
        const err = errorHandler(error);
        res.status(400).send(err);
    }
}

module.exports = {signup, login, update};