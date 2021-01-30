const env = require('./util/loadEnv');
env.loadConfig();

require('./services/server').startApp();
