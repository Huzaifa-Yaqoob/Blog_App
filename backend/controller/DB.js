const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Connection
const DBConnect = async () => {
    await mongoose.connect(process.env.DB_URL+process.env.DB_NAME, {
        useNewUrlParser: true,
    });
}

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        validate(value){
            if (!validator.isAlpha(value)) {
                throw new Error("Name must only contains alphabatics characters");
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minlength: [8, "Password must be greater than 8 characters"]
    },
    profilePic: {
        type: String,
        default: "unknown.jpg"
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
});

// hashing user`s password here
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// make static function for login
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error("Password Error0");
    }
    throw new Error("Email Error0");
}

// Blogs Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        maxlength: [20, "Title must be lesser than 20 characters"]
    },
    content: {
        type: String,
        trim: true,
        required: [true, "Content is required"],
    },
    date: {
        type: Date,
        default: Date.now
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});


const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);


module.exports = {DBConnect, User, Blog};