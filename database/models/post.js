import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 500
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
    },
    status: {
        type: String,
        enum: ['ONGOING', 'NEW']
    },
    creator: {
        type: String,
        required: true
    },
    creatorUsername: String
});

export default mongoose?.models?.Post || mongoose?.model('Post', postSchema);