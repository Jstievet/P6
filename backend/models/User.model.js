import mongoose from "mongoose";
import mongooseError from "mongoose-errors";
// unique validator pour bloquer la possibilité de crée plusieurs user avec la même adresse mail
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseError);

const User = mongoose.model('User', userSchema);
export default User