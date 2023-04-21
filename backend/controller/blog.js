const { default: mongoose } = require("mongoose");
const { User, Blog } = require("./DB");
const errorHandler = require("./errorHandler");


// Get all the blogs
const getAll = async (req, res) => {
    try {
        const result = await Blog.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "user_blog" 
                }
            },
            {
                $unwind: {
                  path: '$user_blog',
                  preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    date: 1,
                    "user_blog.name": 1
                }
            },
            {
                $sort: {
                    date: -1,
                }
            }
        ]);
        if (result.length === 0) {
            throw new Error("Empty blogs");
        }
        res.send(result);
    } catch (error) {
        res.status(400).end();
    }
}

// Get the logged in user`s blog
const getMine = async (req, res) => {
    const userId = req.userId;
    try {
            const result = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'blogs',
                        localField: 'blogs',
                        foreignField: '_id',
                        as: 'blogs'
                    }
                },
                {
                    $unwind: {
                        path: '$blogs',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        "blogs._id":1,
                        "blogs.date": 1,
                        "blogs.title": 1,
                        "blogs.content": 1
                    }
                }
            ]);
            res.send(result);
    } catch (error) {
        res.status(400).end();
    }
}

// Create blog in data base
const write = async (req, res) => {
    const {title, content } = req.body;
    try {
            const _id = req.userId;
            const blogObj = {
                title,
                content,
                authorId: new mongoose.Types.ObjectId(_id)
            }
            const blog =  new Blog(blogObj);
            const result = await blog.save();
            const body = {$push : { blogs: result._id }}
            await User.findOneAndUpdate({ _id }, body);
            res.end();
    } catch (error) {
        const err = errorHandler(error);
        res.status(400).send(err);
    }
}

// Delete blog from the daatabase
const deleted = async (req, res) => {
    const blogId = req.params.id;
    try {
            const userId = req.userId;
            const blog = await Blog.findOne({_id: blogId}).select("authorId");
            if (userId === blog.authorId.toString()) {
                await Blog.findByIdAndRemove({ _id: blogId });
                await User.findByIdAndUpdate(
                    {_id: userId}, 
                    {$pull: {blogs: blogId}}, 
                    {new: true}
                );
                res.end();
            }else{
                throw new Error("Access Denied0");
            }
    } catch (error) {
        res.status(400).end();
    }
} 

module.exports = { getAll, getMine, write, deleted };

