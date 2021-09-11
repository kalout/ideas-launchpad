import connectDB from './../../../database/connectDB';
import User from './../../../database/models/user';
import Post from './../../../database/models/post';
import decode from 'jwt-decode';

const getUserId = token => decode(token)?.id;

const handler = async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        let userId = getUserId(token);

        if (!userId)
            return res.status(400).json({ message: "Unauthorized !" });

        await connectDB();
        switch (req?.method) {
            case 'GET':
                console.log(userId);
                break;

            case 'POST':
                console.log(userId);
                break;

            default:
                break;
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default handler;