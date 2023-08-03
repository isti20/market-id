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

const allCategory = async (req, res) => {
    const q = req.query.q ? req.query.q : "";

    const sort_by = req.query.sort_by ? req.query.sort_by.toLowerCase() : "desc";
    const sort_key = sort_by === "asc" ? 1 : -1;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 25;

    const pages = page === 1 ? 0 : (page - 1) * per_page;

    try {
        const filter = { name: { $regex: q, $options: "i" } };

        const total = await ModelCategories.count(filter);
        const data = await ModelCategories.find(filter).sort({ _id: sort_key }).skip(pages).limit(per_page);

        Messages(res, 200, "All data", data, { page, per_page, total });
    } catch (error) {
        Messages(res, 500, error?.messages | "Internal server error");
    };
};

export { createCategory, allCategory };