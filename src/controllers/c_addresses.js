import ModelAddress from "../models/m_addresses.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

const createAddress = async (req, res) => {
    const body = req.body;

    const rules = {
        name: "required|min:4|max:20",
        address: "required|min:10|max:255",
        province: {
            _id: "required",
            name: "required"
        },
        regency: {
            _id: "required",
            name: "required"
        },
        district: {
            _id: "required",
            name: "required"
        },
        village: {
            _id: "required",
            name: "required"
        },
        passcode: "required|numeric"
    };

    try {
        await isValidator(body, rules, null, async(err, status) => {
            if (!status) return Messages(res, 412, { ...err, status });
    
            const user_id = res.checkout_user._id;
            const name = body.name.toLowerCase().trim();
            const address = req.body.address.trim();

            const filter = {
                $and: [{ "user_id": user_id }, { name }]
            };
    
            const findByname = await ModelAddress.findOne(filter)
    
            if (findByname) return Messages(res, 400, `Name ${name} has been registered`)
    
            const payload = { ...body, name, address, user_id };
    
            await new ModelAddress(payload).save();
    
            Messages(res, 201, "Create success");
        });
    } catch (error) {
        Messages(res, 500, error?.message || "Internal server error");
    };
};

export { createAddress };