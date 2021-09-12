import connectDB from './../../../database/connectDB';
import Post from './../../../database/models/post';
import decode from 'jwt-decode';

const getUserId = token => decode(token)?.id;

const handler = async (req, res) => {
    try {
        await connectDB();
        switch (req?.method) {
            case 'GET':
                const { page } = req?.query, LIMIT = 12, startIndex = (Number(page) - 1) * LIMIT;
                const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
                res.status(200).json(posts);
                break;

            case 'POST':
                const token = req?.headers?.authorization?.split(" ")[1];
                let userId = getUserId(token);

                if (!userId)
                    return res.status(400).json({ message: "Unauthorized !" });

                const { title, body, tags } = req?.body;

                if (title?.length === 0 || body?.length === 0 || tags?.length === 0)
                    return res.status(404).json({ message: "Please fill all fields !" });

                if (title?.length > 30 || body?.length > 300 || tags?.length > 5)
                    return res.status(405).json({ message: "Please decrease the char count !" });

                const newPost = new Post({ title: title, description: body, tags: tags, creator: userId });
                newPost.save();

                res.status(200).json(newPost);
                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default handler;