const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'admin'
        }
    },
    {
        timestamps: true
    }
)

//hashPassword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    //salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//checkPassword
userSchema.methods.verifyPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)
module.exports = User;