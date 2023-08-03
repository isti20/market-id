import ModelProducts from "../models/m_products.js";
import ModelCategories from "../models/m_categories.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";
import Cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res) => {
    const body = req.body;
    const file = req.file;

    const rules = {
        name: "required|min:4|max:100",
        price: "required|numeric",
        category_id: "required|alpha_num",
    };

    try {
        if (!file) return Messages(res, 412, "Image required");

        await isValidator({ ...body }, rules, null, async (err, status) => {
            if (!status) return Messages(res, 412, { ...err, status });

            const findCategory = await ModelCategories.findOne({
                _id: body.category_id
            });

            if (!findCategory) return Messages(res, 404, "Data not found");

            // Upload new image to cloudinary
            const result = await Cloudinary.uploader.upload(file.path);

            // assign data
            const payload = {
                ...body,
                name: body.name.trim(),
                price: parseInt(body.price),
                image: {
                    url: result.secure_url,
                    cloudinary_id: result.public_id,
                },
                category: {
                    _id: findCategory._id,
                    name: findCategory.name,
                },
            };

            // create product
            await new ModelProducts(payload).save();

            Messages(res, 201, "Create success");
        });
    } catch (error) {
        Messages(res, 500, error?.message || "Internal server error");
    }
};

export { createProduct };