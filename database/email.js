const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "juancarlos192003@gmail.com", // generated ethereal user
    pass: "rispjqiufhibjfhi", // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Ready for send email');
});

exports.emailStar = () => {
  transporter.sendMail({
    from: '"Seccion Iniciada" <info@coopacfi.com>', // sender address
    to: "juancarlos192003@gmail.com", // list of receivers
    subject: "Actividad de inicio de sesión de la cuenta Coopacfi", // Subject line
    text: "Cuenta de Coopacfi" + "Actividad de inicio de sesión" + "Hemos detectado un reciente inicio de sesión de la cuenta Coopafi ju**3@hotmail.com.", // plain text body
    html: `<p><b style="color: #707070;margin: 0; font-size: 17px; font-family: 'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;">Cuenta de Coopafi</b></p>
      <p style="color: #2672ec;margin: 0; font-size: 41px; font-family: 'Segoe UI Light','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;">Actividad de inicio de sesión</p>
      <p style="color: ##2a2a2a;margin: 0; font-size: 14px;padding-top: 25px; font-family: 'Segoe UI',Tahoma,Verdana,Arial,sans-serif;">Hemos detectado un reciente inicio de sesión de la cuenta Coopafi ju**3@hotmail.com.</p>`, // html body
  });
  console.log("Email enviado");
}
exports.emailSolicitud = (email,name) => {
  transporter.sendMail({
    from: '"Solicitud de Prestamo" <info@coopacfi.com>', // sender address
    to: email, // list of receivers
    subject: `Solicitud de prestamo de ${name}`, // Subject line
    html: `<p>hola he enviado correo</p>`, // html body
  });
  console.log("Email enviado");
}