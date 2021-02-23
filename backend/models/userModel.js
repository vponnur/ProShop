import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        default: "01234567890"
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps: true
});

//machPassword is a method
//this.password  will execute on callrequested object
userSchema.methods.matchPassword = async function (reqPassword) {
    return await bcryptjs.compare(reqPassword, this.password);
}

//mongoose will handle this method automatically before every save method like Create
userSchema.pre('save', async function (next) {
    //should not run on modify , its not modifed just move on...
    if (!this.isModified('password')) {
        next()
    }
    //passowd hasing
    const salt = await bcryptjs.genSalt(10);
    //this.password - we are overriding exsting ref
    this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;