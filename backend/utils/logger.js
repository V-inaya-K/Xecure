// backend/utils/logger.js
function log(message) {
  console.log(`[LOG]: ${message}`);
}

function error(message) {
  console.error(`[ERROR]: ${message}`);
}

module.exports = { log, error };
