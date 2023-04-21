
const errorHandler = (error) => {

    // create empty object to store errors
    const myError = {};

    // incorrect email error
    if (error.message === "Email Error0") {
        myError["email"] = "That email is not registered";
        return myError;
    }
    
    // incorrect password error
    if (error.message === "Password Error0") {
        myError["password"] = "This password is incorrect";
        return myError;
    }

    if (error.message === "Email Error1") {
        myError["email"] = "This email format is incorrect";
        return myError;
    }

    // Incorrect name
    if (error.message === "name Error1") {
        myError["name"] = "Only alphabets are allowed in name";
        return myError;
    }

    // handle uploading a wrong format of file 
    if (error.message === "Image Error0") {
        myError["image"] = "Only JPG files are allowed";
        return myError;
    }

    // access is denied while deleting a blog
    if (error.message === "Access Denied0") {
        myError["access"] = "Access is denied";
        return myError;
    }

    // duplicate email error code
    if (error.code === 11000) {
        myError["email"] = "This email has already been registered";
        return myError;
    }

    // Validation error
    if (error.message.includes("validation failed")) {
        const err = Object.values(error.errors);
        err.forEach(({properties}) => {
            myError[properties.path] = properties.message;
        });
    }
    return myError;
}

module.exports = errorHandler;