import ModelCheckout from "../models/m_checkouts.js";

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

            await new ModelCheckout(body).save();

            Messages(res, 201, "Create success");
        });
    } catch (error) {
        Messages(res, 500, error?.message || "Internal server error");
    };
};

const allCheckout = async (req, res) => {
    const q = req.query.q ? req.query.q : "";

    const sort_by = req.query.sort_by ? req.query.sort_by.toLowerCase() : "desc";
    const sort_key = sort_by === "asc" ? 1 : -1;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 25;

    const pages = page === 1 ? 0 : (page - 1) * per_page;

    try {
        const filter = { invoice: { $regex: q, $options: "i" } };

        const total = await ModelCheckout.count(filter);
        const data = await ModelCheckout.find(filter).sort({ _id: sort_key }).skip(pages).limit(per_page);

        const incomes = data.reduce((accumulator, current) => accumulator.total + current.total);

        Messages(res, 200, "All data", {data, incomes }, {
            page,
            per_page,
            total
        });
    } catch (error) {
        Messages(res, 500, error?.message || "Internal Server Error");
    }
};

export { createCheckout, allCheckout };