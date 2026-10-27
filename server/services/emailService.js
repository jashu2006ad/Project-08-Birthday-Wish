const nodemailer = require('nodemailer');

class EmailConfigurationError extends Error {
  constructor() {
    super('Email is not configured. Set SMTP_USER and SMTP_PASS in server/.env.');
    this.name = 'EmailConfigurationError';
  }
}

async function sendAnswersEmail(answers) {
  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    throw new EmailConfigurationError();
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  const questionLabels = [
    'When was our first met?',
    'When was our friends gathered date?',
    'What is your favourite memory with me?',
    "What's the most embarrassing thing you've done in front of me?",
    "What's one gift you've always wanted but never received?",
    'What do you wish our friendship will look like five years from now?',
    'If you could celebrate your birthday anywhere in the world, where would you go?',
    "What's one thing you wish for yourself this year?",
    'Have I ever hurt you without realizing it?',
    'When was our last meet?',
  ];

  const text = questionLabels
    .map((question, index) => `${index + 1}. ${question}\n${answers[`question${index + 1}`]}`)
    .join('\n\n');

  await transporter.sendMail({
    from: {
      name: 'Birthday Surprise',
      address: SMTP_USER,
    },
    to: process.env.ANSWERS_EMAIL || 'kowshikkayala29@gmail.com',
    subject: 'Birthday answers for Mounii',
    text,
  });
}

module.exports = { EmailConfigurationError, sendAnswersEmail };
