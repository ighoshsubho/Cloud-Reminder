const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();
const twilioClient = twilio(functions.config().twilio.sid,
functions.config().twilio.token);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.createReminder = functions.https.onRequest(async (req, res) => {
    try {
      const { message, phoneNumber, email, reminderTime } = req.body;
  
      // Store the reminder in Firestore
      const reminderRef = await db.collection('reminders').add({
        message,
        phoneNumber,
        email,
        reminderTime: new Date(reminderTime),
      });
  
      // Send response
      res.status(200).json({ id: reminderRef.id });
    } catch (error) {
      console.error('Error creating reminder:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  exports.sendReminderSMS = functions.pubsub
  .schedule('* * * * *') // Schedule to run every minute
  .timeZone('Asia/Kolkata') // Replace with your desired time zone
  .onRun(async (context) => {
    try {
      const currentTimestamp = new Date();

      // Query reminders that match the current time
      const remindersSnapshot = await db
        .collection('reminders')
        .where('reminderTime', '<=', currentTimestamp)
        .get();

      const reminders = [];

      // Prepare the reminders to be sent
      remindersSnapshot.forEach((doc) => {
        const reminder = doc.data();
        reminders.push(reminder);

        // Delete the reminder from Firestore
        doc.ref.delete();
      });

      // Send SMS for each reminder
      for (const reminder of reminders) {
        await twilioClient.messages.create({
          body: reminder.message,
          from: '9330222262',
          to: reminder.phoneNumber,
        });

        console.log(`SMS reminder sent to ${reminder.phoneNumber}`);
      }
    } catch (error) {
      console.error('Error sending SMS reminders:', error);
    }
  });

  exports.sendReminderEmail = functions.pubsub
  .schedule('* * * * *') // Schedule to run every minute
  .timeZone('Asia/Kolkata') // Replace with your desired time zone
  .onRun(async (context) => {
    try {
      const currentTimestamp = new Date();

      // Query reminders that match the current time
      const remindersSnapshot = await db
        .collection('reminders')
        .where('reminderTime', '<=', currentTimestamp)
        .get();

      const reminders = [];

      // Prepare the reminders to be sent
      remindersSnapshot.forEach((doc) => {
        const reminder = doc.data();
        reminders.push(reminder);

        // Delete the reminder from Firestore
        doc.ref.delete();
      });

      // Send email for each reminder
      for (const reminder of reminders) {
        const mailOptions = {
          from: 'ighoshsubho@gmail.com',
          to: reminder.email,
          subject: 'Reminder',
          text: reminder.message,
        };

        await transporter.sendMail(mailOptions);

        console.log(`Email reminder sent to ${reminder.email}`);
      }
    } catch (error) {
      console.error('Error sending email reminders:', error);
    }
  });