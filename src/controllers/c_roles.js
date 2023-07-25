import ModelRoles from "../models/m_roles.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

const createRole = async (req, res) => {
    const name = req.body.name;

    const rules = {
        name: "required|min:3|max:20"
    };
    try {
        await isValidator({ name }, rules, null, async(err, status) => {
            if (!status) return Messages(res, 412, { ...err, status });

            const inputName = name.toLowerCase().trim();
            const filter = { name: { $regex: inputName, $options: "i" } };

            const isSameName = await ModelRoles.findOne(filter);
            if (isSameName) return Messages(res, 400, `${inputName} has been register on system`);

            // create role
            await new ModelRoles({ name: inputName }).save();

            Messages(res, 200, "Register success");
        })
    } catch (error) {
        Messages(res, 500, error?.Messages | "Internal server error")
    }
};

export { createRole };