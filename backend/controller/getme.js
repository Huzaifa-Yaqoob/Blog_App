const { User } = require("./DB");
const mongoose = require("mongoose");

// getting user email, name, and profilePic and token
const getme = async (id, token) => {
    try {
            const result = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $project: {
                        _id: 0,
                        email: 1,
                        name: 1,
                        profilePic: 1
                    }
                }
            ]);
            const [data] = result;
            return (JSON.stringify({data, token}));
    } catch (error) {
        res.status(400).send({err: "SomEthing`s Wrong"});
    }
}

module.exports = getme ;