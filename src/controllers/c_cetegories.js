import ModelCategories from "../models/m_categories.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

const createCategory = async (req, res) => {
    const name = req.body.name;

    const rules = {
        name: "required|min:4|max:20"
    };

    await isValidator({name}, rules, null, async(err, status) => {
        if (!status) return Messages(res, 412, { ...err, status });

        const inputName = name.toLowerCase().trim();
        const filter = { name: { $regex: inputName, $options: "i" } };

        const isSameName = await ModelCategories.findOne(filter);
        if (isSameName) return Messages(res, 400, `${inputName} has been register on system`);

        await new ModelCategories({
            name: inputName
        }).save();

        Messages(res, 201, "Create success");
    });
};

export { createCategory };