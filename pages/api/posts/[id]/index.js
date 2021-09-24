import connectDB from './../../../../database/connectDB';
import Post from './../../../../database/models/post';
import User from './../../../../database/models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        await connectDB();

        if (req?.method === 'DELETE') {
            const { id } = req.query;

            const post = await Post.findById(id);

            if (!post)
                return res.status(404).json({ error: 'Post not found' });

            const token = req?.headers?.authorization?.split(' ')[1];
            const decodedData = jwt.verify(token, 'ThIs_Is_A_sEcReT_kEy');

            if (!decodedData)
                return res.status(401).json({ error: 'Unauthorized' });

            if (decodedData.id !== post.creator)
                return res.status(401).json({ error: 'Unauthorized' });

            const user = await User.findById(decodedData.id), newF = user?.tagsFrequency;

            for (let i = 0; i < post?.tags?.length; i++) {
                newF[post.tags[i]]--;
                if (newF[post.tags[i]] === 0)
                    delete newF[post.tags[i]];
            }

            await User.findByIdAndUpdate(decodedData.id, { tagsFrequency: newF }, { new: true });
            await post.remove();

            return res.status(200).json({ success: 'Post deleted' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default handler;