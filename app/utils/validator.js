const Joi = require("joi")

const _validator = async (data, schema) => {
    try {
        const result = await schema.validate(data)
        // console.log("res::", result)
        if (result.error) {
            return ({
                isError: true,
                message: result.error.message,
                data: {}
            })
        } else {
            return ({
                isError: false,
                message: result.value,
                data: {}
            })
        }

    } catch (error) {
        // console.log("error in validator::", error)
        return ({
            isError: true,
            message: error
        })
    }
}


module.exports = _validator