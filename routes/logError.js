// Error logging function
const { models } = require('../config/db');
const ErrorLog = models.ErrorLog
async function logError(message, stackTrace = null, additionalInfo = null) {
    try {
        // console.log('Logging error:', message); // Debug log
        await ErrorLog.create({
            message,
            stack_trace: stackTrace,
            additional_info: additionalInfo,
        });
    } catch (err) {
        console.error('Failed to log error:', err);
    }
}

// Error handling middleware


module.exports = { logError };