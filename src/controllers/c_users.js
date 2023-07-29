import ModelUser from "../models/m_users.js";
import ModelRoles from "../models/m_roles.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/secret.js";
import bcrypt from "bcrypt";

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

        const findRole = await ModelRoles.findOne({ name: "customer" })
        if (!findRole) return Messages(res, 400, "Role not found");

        //hash password
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(body.password, salt)

        await new ModelUser({
            ...body,
            password,
            image: {
                url: null,
                cloudinary_id: null,
            },
            role: {
                _id: findRole._id,
                name: findRole.name
            },
            status: false,
            token: null,
        }).save();

        Messages(res, 200, "Register Success");
    });
};

const loginUser = async (req, res) => {
    const body = req.body;

    const rules = {
        email: "required|email",
        password: "required|min:8|max:12"
    };

    try {
        await isValidator(body, rules, null, async(err, status) => {
            if (!status) return Messages(res, 412, { ...err, status });

            const findByEmail = await ModelUser.findOne({ email: body.email })
            if (!findByEmail) return Messages(res, 400, "Email not register");

            // compare password use bcrypt
            const isHashPassword = findByEmail.password
            const comparePassword = bcrypt.compareSync(body.password, isHashPassword);

            if (!comparePassword) return Messages(res, 400, "Wrong password, please check again.")

            // check status account user
            const isStatus = findByEmail.status;
            if (!isStatus) return Messages(res, 400, "Your account is being deactivated");

            // variabel id user
            const _id = findByEmail._id

            // encode jwt
            const payload = {
                _id: findByEmail._id,
                role: {
                    _id: findByEmail.role._id,
                    name: findByEmail.role.name
                }
            };

            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

            await ModelUser.findByIdAndUpdate(_id, { token }, { new: true });

            Messages(res, 200, "Login success", { _id, token, role: { ...findByEmail.role } });
        });
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal Server Error");
    };
};

const logoutUser = async (req, res) => {
    const _id = req.params._id

    try {
        const findData = await ModelUser.findById({_id});
        if (!findData) return Messages(res, 404, "User not found")

        const payload = { token: null }
        await ModelUser.findByIdAndUpdate(_id, payload, { new: true });

        Messages(res, 200, "Logout success");
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal Server Error");
    }
};

const allData = async (req, res) => {
    try {
        const data = await ModelUser.find();

        Messages(res, 200, "Success!", data);
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal Server Error");
    }
};

export { registerUser, loginUser, logoutUser, allData };