
const controller = require("./productForm.controller")

exports.addProductForm = async (req, res) => {
    try {
        const response = await controller.addProductForm(req.body)
        console.log("response::", response)

    } catch (error) {
        console.log("error", error)
    }
}