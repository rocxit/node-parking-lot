const MAX_REQ_LIMIT = process.env.MAX_NO_REQ;
const MAX_TIME_SEC = process.env.MAX_REQ_LIMIT_TIME_SEC;

const map = new Map();

async function rateLimit(ipAddr) {
    const value = map.get(ipAddr)
    if (value) {
        timeDiff = (new Date().getTime() - new Date(value.time).getTime())/1000
        if (timeDiff > MAX_TIME_SEC) {
            map.set(ipAddr, {
                time: new Date(),
                count: 1
            });

            return true;
        } else if (timeDiff < MAX_TIME_SEC && value.count < MAX_REQ_LIMIT) {
            map.set(ipAddr, {
                time: value.time,
                count: value.count + 1
            });

            return true;
        } else if (timeDiff < MAX_TIME_SEC && value.count >= MAX_REQ_LIMIT) {
            return false;
        }
    }

    map.set(ipAddr, {
        time: new Date(),
        count: 1
    });

    return true;
}

module.exports = rateLimit;
