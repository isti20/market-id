import ModelUser from "../models/m_users.js"

const allData = async (req, res) => {
    try {
        const data = await ModelUser.find();

        res.status(200).send({
            message: "Get All Data User Succes!",
            data,
        });
    } catch (error) {
        res.status(500).send({
            message: error?.messages | "Internal Server Error"
        });
    }
};

export { allData };