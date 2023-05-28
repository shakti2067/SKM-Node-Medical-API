
// common send sucess response
exports.sendSucessResponse = (
    message = "",
    data = {},
    meta = {},
    options = {}
) => {

    const responseObject = {
        isError: false,
        message: message,
        data: data,
        meta: meta

    }

    Object.assign(responseObject, options)

    return responseObject
}

// Common Error Messaage
exports.sendMessageResponse = (
    message = "",
    data = {},
    meta = {},
    options = {}
) => {

    const responseObject = {
        isError: false,
        message: message,
        data: data,
        meta: meta
    }

    Object.assign(responseObject, options)

    return responseObject
}


exports.sendErrorResponse = (
    message = "",
    options = {}
) => {
    const responseObject = {
        isError: true,
        message: message
    }

    Object.assign(responseObject, options);

    return responseObject
}