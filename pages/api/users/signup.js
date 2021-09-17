import connectDB from './../../../database/connectDB';
import User from './../../../database/models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    await connectDB();

    if (req?.method === 'POST') {
        const { username, password, confirmPassword, github } = req?.body;

        const userExist = await User.findOne({ username: username });

        if (userExist)
            return res.status(401).json({ message: "Username already exist, please login !" });

        if (username?.split(' ')?.length !== 1)
            return res.status(402).json({ message: "Username can't have spaces !" });

        if (username?.toLowerCase() !== username)
            return res.status(403).json({ message: "Username must be lowercase !" });

        if (password !== confirmPassword)
            return res.status(404).json({ message: "Passwords don't match !" });

        const user = new User({ username: username, password: password });
        await user.save();

        const token = jwt.sign({
            id: user?._id, username: username
        }, 'ThIs_Is_A_sEcReT_kEy', { expiresIn: '72h' });

        return res.status(200).json({ user: { _id: user?._id, username: username }, token: token });
    }
}

export default handler;