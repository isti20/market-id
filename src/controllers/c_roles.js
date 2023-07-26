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

            Messages(res, 201, "Register success");
        })
    } catch (error) {
        Messages(res, 500, error?.Messages | "Internal server error")
    }
};

const allRole = async (req, res) => {
    const q = req.query.q ? req.query.q : ""

    const sort_by = req.query.sort_by ? req.query.sort_by.toLowerCase() : "asc";
    const sort_key = sort_by === "asc" ? 1 : -1;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 25

    const pages = page === 1 ? 0 : (page - 1) * per_page;

    try {
        const filter = { name: { $regex: q, $options: "i" } };
        
        const total = await ModelRoles.count(filter);
        const data = await ModelRoles.find(filter)
        .sort({ _id: sort_key })
        .skip(pages)
        .limit(per_page);

        Messages(res, 200, "All data", data, {
            page,
            per_page,
            total
        });
    } catch (error) {
        Messages(res, 500, error?.Messages | "Internal server error")
    }
};

export { createRole, allRole };