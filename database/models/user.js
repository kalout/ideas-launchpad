import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    bio: {
        type: String,
        maxlength: 200
    },
    github: String,
    twitter: String,
    personal: String
});

export default mongoose?.models?.User || mongoose?.model('User', userSchema);