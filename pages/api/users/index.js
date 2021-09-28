import connectDB from './../../../database/connectDB';
import User from './../../../database/models/user';
import jwt from 'jsonwebtoken';
import Post from './../../../database/models/post';

const handler = async (req, res) => {
    await connectDB();

    try {
        if (req?.method === 'PATCH') {
            const decodedData = jwt.verify(req?.headers?.authorization?.split(' ')[1], 'ThIs_Is_A_sEcReT_kEy');
            const savedUser = await User.findById(decodedData?.id);

            if (!savedUser)
                return res.status(401).json({ message: "User doesn't exist !" });

            const { user, password } = req?.body;

            if (password !== savedUser?.password)
                return res.status(401).json({ message: "Wrong password !" });

            const usernameExists = await User.findOne({ username: user?.username });

            if (usernameExists && savedUser?.username !== user?.username)
                return res.status(401).json({ message: "Username already exists !" });

            if (user?.username?.split(' ')?.length !== 1)
                return res.status(401).json({ message: "Username can't have spaces !" });

            if (user?.username?.toLowerCase() !== user?.username)
                return res.status(401).json({ message: "Username must be lowercase !" });

            await User.findByIdAndUpdate(decodedData?.id, user, { new: true });

            if (savedUser?.username !== user?.username) {
                const posts = await Post.find({ creator: decodedData?.id });

                for (let i = 0; i < posts?.length; i++)
                    await Post.findByIdAndUpdate(posts[i]?._id, { creatorUsername: user?.username }, { new: true });
            }

            return res.status(200).json({ message: "OK" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export default handler;