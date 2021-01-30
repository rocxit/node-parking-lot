const fs = require('fs');
const path = require('path');

function loadConfig() {
    const dotenvPath = path.resolve(process.cwd(), '.env');
    try {
        const parsed = fs.readFileSync(dotenvPath, 'utf-8').split('\n');
        parsed.forEach((val) => {
            let envVariable = val.split('=');
            process.env[envVariable[0]] = envVariable[1];
        })
      } catch (e) {
        return { error: e }
      }
}

module.exports = {
    loadConfig
};
