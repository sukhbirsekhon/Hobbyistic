const sgMail = require('@sendgrid/mail')


module.exports.sendEmail = async function(recipient, header, body) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: recipient, 
    name: 'Erica from Hobbyistic',
    from: 'erica@hobbyistics.com', 
    subject: header,
    text: body
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
  })
  .catch((error) => {
    console.error(error.response.body.errors)
  })
}

//example
//this.sendEmail('jackmchugh00@gmail.com', 'Welcome', 'Hi Jack, welcome to hobbyistic, I hope you have a fun time. Let me know if you need anything');