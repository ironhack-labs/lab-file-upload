const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMUSER,
    pass: process.env.GMPASS
  }
})

exports.sendConfimationCode = (email, confimationCode ) => {
  return transporter.sendMail({
    to: email,
    from: '"Tumblr" <tumblr@gmail.com>',
    subject: 'Email confirmation for Tumblr',
    html: confimationCode
  }).then(r => r).catch(e => e)
}
