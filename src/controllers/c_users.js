import ModelUser from "../models/m_users.js"
import Messages from "../utils/messages.js"

const allData = async (req, res) => {
    try {
        const data = await ModelUser.find();

        Messages(res, 200, "Get All Data User Success!", data);
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal Server Error");
    }
};

export { allData };