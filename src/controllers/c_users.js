import ModelUser from "../models/m_users.js";
import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

const registerUser = async (req, res) => {
    const body = req.body;

    const rules = {
        full_name: "required|min:4|max:20",
        email: "required|email",
        password: "required|min:8|max:12"
    };

    await isValidator(body, rules, null, async (err, status) => {
        if (!status) return Messages(res, 412, { ...err, status });

        const findByEmail = await ModelUser.findOne({ email: body.email });

        if (findByEmail) return Messages(res, 400, "Email has been register");

        await new ModelUser(body).save();

        Messages(res, 200, "Register Success");
    });
};

const allData = async (req, res) => {
    try {
        const data = await ModelUser.find();

        Messages(res, 200, "Get All Data User Success!", data);
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal Server Error");
    }
};

export { registerUser, allData };