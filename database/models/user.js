import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    github: String,
    twitter: String,
    personal: String
});

export default mongoose?.models?.User || mongoose?.model('User', userSchema);