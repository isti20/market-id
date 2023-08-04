import ModelCheckouts from "../models/m_checkouts.js";

import Messages from "../utils/messages.js";
import isValidator from "../utils/validator.js";

const createCheckout = async (req, res) => {
    const body = req.body;

    // create invoice
    const invoice = `INVOICE${Date.now()}`;

    // get data user from response checkout_user on auth
    const user = { ...res.checkout_user };

    // assign new property in body request
    body.invoice = invoice;
    body.user = user;
    body.status = false;

    const rules = {
        invoice: "required",
        user: {
            _id: "required",
            full_name: "required",
            email: "required"
        },
        cart: "required",
        address: {
            _id: "required",
            name: "required"
        },
        status: "required|boolean",
        total: "required|numeric",
    };

    try {
        await isValidator({ ...body }, rules, null, async(err, status) => {
            if (!status) return Messages(res, 404, { ...err, status });

            await new ModelCheckouts(body).save();

            Messages(res, 201, "Create success");
        });
    } catch (error) {
        Messages(res, 500, error?.message || "Internal server error");
    };
};

export { createCheckout };