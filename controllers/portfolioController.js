const nodemailer = require("nodemailer");


// email config

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:"paras7394@gmail.com",
      pass:process.env.MY_API,
  }
})




const sendEmailController = (req, res) => {
    try {
      const { name, email, msg } = req.body;
  
      //validation
      if (!name || !email || !msg) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      //email matter
      transporter.sendMail({
        to: "paras7394@gmail.com",
        from: email,
        subject: "Regarding Mern Portfolio App",
        html: `
          <h5>Detail Information</h5>
          <ul>
            <li><p>Name : ${name}</p></li>
            <li><p>Email : ${email}</p></li>
            <li><p>Message : ${msg}</p></li>
          </ul>
        `,
      });
  
      return res.status(200).send({
        success: true,
        message: "Your Message Send Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Send Email API Error",
        error,
      });
    }
  };

module.exports = { sendEmailController };