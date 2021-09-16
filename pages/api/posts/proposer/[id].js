import User from './../../../../database/models/user';
import connectDB from './../../../../database/connectDB';

const handler = async (req, res) => {
    await connectDB();

    if (req?.method === 'GET') {
        const { id } = req.query;
        const user = await User.findById(id);

        res.status(200).json({ username: user?.username, bio: user?.bio });
    }
}

export default handler;