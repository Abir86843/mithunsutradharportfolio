# Email Server Setup Instructions

This document explains how to set up the server for handling contact form submissions and sending emails.

## Prerequisites

1. Node.js installed on your computer or server (download from [nodejs.org](https://nodejs.org/))
2. A Gmail account to send emails from

## Setup Steps

### 1. Install Dependencies

Open a terminal/command prompt in your project folder and run:

```bash
npm install
```

This will install all the required packages defined in package.json.

### 2. Configure Gmail for Sending Emails

For security reasons, Gmail requires you to use an "App Password" instead of your regular password:

1. Go to your Google Account settings: [myaccount.google.com](https://myaccount.google.com/)
2. Enable 2-Step Verification if you haven't already
3. Go to "Security" → "App passwords"
4. Select "Mail" as the app and "Other" as the device (name it "Portfolio Contact Form")
5. Click "Generate" and copy the 16-character password

### 3. Update Email Configuration

Open `server.js` and update the email configuration:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-app-password'     // Replace with the app password you generated
  }
});
```

### 4. Start the Server

Run the following command to start the server:

```bash
npm start
```

The server will start on port 3000 by default (or another port if specified in the environment).

## Hosting Options

For a production environment, you'll need to host this server. Some options include:

1. **Heroku**: Easy deployment, has a free tier
2. **Vercel**: Good for Node.js applications
3. **DigitalOcean**: More control, requires more setup
4. **AWS**: Highly scalable, more complex setup

## Troubleshooting

- If emails aren't being sent, check your Gmail settings to ensure less secure apps are allowed
- Make sure your app password is correctly entered
- Check the server logs for any error messages

## Security Considerations

- Never commit your email password to version control
- In a production environment, use environment variables for sensitive information
- Consider implementing rate limiting to prevent abuse of your contact form 