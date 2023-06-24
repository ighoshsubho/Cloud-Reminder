# Cloud Reminder App 👋📅
The Cloud Reminder App is a ⛅️ cloud-based application that allows you to create reminders and automatically sends SMS 📱 and email 📧 notifications at the specified time. It utilizes Firebase Functions, Twilio for SMS functionality, and Nodemailer for email functionality.

## Features ✨
1. Create reminders with a message, phone number, email, and reminder time. ⏰
2. Reminders are stored in Firestore for persistence. 💾
3. Automatic SMS reminders sent using Twilio. 📲
4. Automatic email reminders sent using Nodemailer. ✉️
5. Scheduled reminders based on the specified reminder time. 📆

## Prerequisites 📋
Before running the Cloud Reminder App, ensure you have the following prerequisites:

1. A Firebase project set up. 🔥
2. Node.js and npm (Node Package Manager) installed on your machine. 🚀

## Installation 🛠️
To get started with the Cloud Reminder App, follow these steps:

1. Clone the repository: `git clone https://github.com/ighoshsubho/Cloud-Reminder.git` 📥
2. Navigate to the project directory: cd reminder-app 📂
3. Install the dependencies: npm install ⚙️

## Configuration ⚙️
Before running the Cloud Reminder App, make sure to configure the following:

1. Firebase project: Set up your Firebase project and obtain the necessary configuration credentials. Update the Firebase configuration in the Firebase initialization code. 🔑
2. Twilio: Sign up for a Twilio account and obtain your Twilio SID and token. Update the Twilio client initialization with your Twilio credentials. 📞
3. Nodemailer: Create a Gmail account to use as the sender for email reminders. Update the transporter configuration with your Gmail account details. 📧

## Usage 🚀
The Cloud Reminder App consists of two main components: creating a reminder and sending reminders.

## Creating a Reminder 📝
To create a reminder, make an HTTP POST request to the `/createReminder` endpoint with the following parameters:

- `message`: The reminder message. 💬
- `phoneNumber`: The phone number to receive SMS reminders. 📱
- `email`: The email address to receive email reminders. 📧
- `reminderTime`: The time at which the reminder should be sent (formatted as ISO string). ⏰

## Sending Reminders 📤
The Cloud Reminder App automatically sends reminders at the specified time using Firebase's Pub/Sub scheduler.

- SMS Reminders: The sendReminderSMS function sends SMS reminders. It runs every minute and sends SMS messages using Twilio. 📲
- Email Reminders: The sendReminderEmail function sends email reminders. It runs every minute and sends email notifications using Nodemailer. ✉️

## Contributing 🤝
Contributions to the Cloud Reminder App are welcome! If you encounter any issues or have suggestions for improvements, please submit a pull request or open an issue on the GitHub repository. 🎉

## License 📄
The Cloud Reminder App is licensed under the MIT License. 📝
