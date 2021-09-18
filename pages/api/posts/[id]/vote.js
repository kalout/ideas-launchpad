import connectDB from '../../../../database/connectDB';
import Post from '../../../../database/models/post';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        await connectDB();
        if (req?.method === 'PATCH') {
            const { voteType } = req?.body, { id } = req?.query;

            const post = await Post.findById(id);

            if (!post)
                return res.status(404).json({ error: 'Post not found' });

            const token = req?.headers?.authorization?.split(' ')[1];
            const decodedData = jwt.verify(token, 'ThIs_Is_A_sEcReT_kEy');

            if (voteType === 1) {
                post.upVotes.push(decodedData.id);
                post.downVotes = post.downVotes.filter(x => x !== decodedData.id);
            } else if (voteType === -1) {
                post.downVotes.push(decodedData.id);
                post.upVotes = post.upVotes.filter(x => x !== decodedData.id);
            } else if (voteType === 0) {
                post.upVotes = post.upVotes.filter(x => x !== decodedData.id);
                post.downVotes = post.downVotes.filter(x => x !== decodedData.id);
            }

            await Post.findByIdAndUpdate(id, post);
            return res.status(200).json({ message: 'OK' });
        }
        return res.status(400).json({ error: 'Invalid request' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default handler;