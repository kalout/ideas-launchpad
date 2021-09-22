import connectDB from './../../../database/connectDB';
import User from './../../../database/models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    await connectDB();

    if (req?.method === 'POST') {
        const { username, password, confirmPassword, firstName, lastName } = req?.body;

        const userExist = await User.findOne({ username: username });

        if (!firstName || !lastName)
            return res.status(401).json({ message: "Please enter you name !" });

        if (userExist)
            return res.status(401).json({ message: "Username already exist, please login !" });

        if (username?.split(' ')?.length !== 1)
            return res.status(401).json({ message: "Username can't have spaces !" });

        if (username?.toLowerCase() !== username)
            return res.status(401).json({ message: "Username must be lowercase !" });

        if (password !== confirmPassword)
            return res.status(401).json({ message: "Passwords don't match !" });

        const user = new User({ username: username, password: password, fullName: `${firstName} ${lastName}` });
        await user.save();

        const token = jwt.sign({
            id: user?._id, username: username
        }, 'ThIs_Is_A_sEcReT_kEy', { expiresIn: '72h' });

        return res.status(200).json({
            user: { _id: user?._id, username: username, fullName: user?.fullName },
            token: token
        });
    }
}

export default handler;