import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 30
    },
    description: {
        type: String,
        maxlength: 300
    },
    upVotes: {
        type: [String],
        default: []
    },
    downVotes: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose?.models?.Post || mongoose?.model('Post', postSchema);