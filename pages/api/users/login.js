import connectDB from './../../../database/connectDB';
import User from './../../../database/models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    await connectDB();

    if (req?.method === 'POST') {
        const { username, password } = req?.body;

        const user = await User.findOne({ username: username });

        if (!user)
            return res.status(401).json({ message: "User doesn't exist !" });

        if (password !== user?.password)
            return res.status(402).json({ message: "Invalid credentials !" });

        const token = jwt.sign({
            id: user?._id, username: username
        }, 'ThIs_Is_A_sEcReT_kEy', { expiresIn: '72h' });

        return res.status(200).json({ user: { _id: user?._id, username: username }, token: token });
    }
}

export default handler;