const { EmailConfigurationError, sendAnswersEmail } = require('../services/emailService');

const QUESTION_COUNT = 10;

function validatePayload(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return ['Invalid payload: answers must be an object'];
  }

  const errors = [];
  for (let index = 1; index <= QUESTION_COUNT; index++) {
    const answer = answers[`question${index}`];
    if (typeof answer !== 'string' || answer.trim().length === 0) {
      errors.push(`Question ${index} answer is required`);
    } else if (answer.trim().length > 1000) {
      errors.push(`Question ${index} answer must be under 1000 characters`);
    }
  }
  return errors;
}

/**
 * POST /api/birthday/answers
 * Emails the ten birthday answers to the configured recipient.
 * Never logs the submitted answers themselves.
 */
exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;

    // Validate
    const errors = validatePayload(answers);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
        errors,
      });
    }

    const sanitisedAnswers = Object.fromEntries(
      Array.from({ length: QUESTION_COUNT }, (_, index) => {
        const key = `question${index + 1}`;
        return [key, answers[key].trim()];
      })
    );
    await sendAnswersEmail(sanitisedAnswers);

    console.log(`[${new Date().toISOString()}] Birthday answers emailed successfully`);

    return res.status(201).json({
      success: true,
      message: 'Your answers have been emailed. ❤️',
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error(`[${new Date().toISOString()}] Email configuration error:`, error.message);
      return res.status(503).json({
        success: false,
        message: 'Email delivery is not configured yet. Please contact the site owner.',
      });
    }

    console.error(`[${new Date().toISOString()}] Error emailing answers:`, error.message);
    return res.status(500).json({
      success: false,
      message: 'We could not email your answers. Please try again in a moment.',
    });
  }
};

/**
 * GET /api/birthday/health
 * Simple health check endpoint.
 */
exports.healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    emailConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
    timestamp: new Date().toISOString(),
  });
};
