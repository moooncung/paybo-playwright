/**
 * Helper functions untuk test automation
 */

/**
 * Wait untuk beberapa detik
 * @param {number} ms - Milliseconds to wait
 */
export async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random email untuk testing
 * @returns {string} Random email
 */
export function generateRandomEmail() {
    const timestamp = Date.now();
    return `test.user.${timestamp}@mailinator.com`;
}

/**
 * Extract domain dari URL
 * @param {string} url - Full URL
 * @returns {string} Domain name
 */
export function extractDomain(url) {
    return new URL(url).hostname;
}

/**
 * Format date ke format yang readable
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
export function formatDate(date) {
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Parse JSON response
 * @param {string} jsonString - JSON string
 * @returns {object} Parsed JSON or null
 */
export function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

/**
 * Log dengan timestamp
 * @param {string} message - Message to log
 * @param {string} level - Log level (info, warn, error)
 */
export function logWithTimestamp(message, level = 'info') {
    const timestamp = formatDate(new Date());
    const prefix = {
        info: 'ℹ️',
        warn: '⚠️',
        error: '❌',
    }[level] || '📝';

    console.log(`${prefix} [${timestamp}] ${message}`);
}

/**
 * Retry function dengan exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Max retry attempts
 * @param {number} delayMs - Initial delay in ms
 */
export async function retryWithBackoff(
    fn,
    maxAttempts = 3,
    delayMs = 1000
) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            logWithTimestamp(`Attempt ${attempt}/${maxAttempts}`, 'info');
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts) {
                const delay = delayMs * Math.pow(2, attempt - 1);
                logWithTimestamp(
                    `Retry setelah ${delay}ms - Error: ${error.message}`,
                    'warn'
                );
                await wait(delay);
            }
        }
    }

    throw lastError;
}