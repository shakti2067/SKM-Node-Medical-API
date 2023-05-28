const nodemailer = require("nodemailer")
const logger = require("../utils/logger");
const util = require("util")

exports.sendMail = async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            secureConnection: false,
            auth: {
                user: "nodealien003@gmail.com",
                pass: "jkyliseiemiowfbr"  // this password is gmail app password
            }
        })

        let appName = "SKM Medical"

        let mail = await transporter.sendMail({
            from: `${appName} nodealien003@gmail.com`,
            to: data.to, //"aniyaliyashaktiwhatsapp@gmail.com"
            subject: data.subject || undefined,  //"hello",
            text: data.message || undefined,
            // html: "<b>hell this is html tag<b>"
        })

        // console.log("email ::::::", mail)
        return mail

    } catch (error) {

        // console.log("error in send email ::", error)
        logger.error(
            util.format("Error while sending Email ::: %O", error)
        )
        throw error
    }



}