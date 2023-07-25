import Validator from "validatorjs";

const isValidator = async (data, rules, customeMessage, callback) => {
    const validation = new Validator(data, rules, customeMessage);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export default isValidator;