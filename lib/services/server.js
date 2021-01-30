const express = require('express');
const rateLimiting = require('../util/rateLimiting');
const PORT = process.env.PORT;
const PARKING_SIZE = process.env.PARKING_SIZE;
const ParkingService = require('./ParkService');
const parkingService = new ParkingService();

const app = express();

app.use(async (req, resp, next) => {
    const overLimit = await rateLimiting(req.ip);
    if (!overLimit) {
        return resp.status(429).send('Too many requests - try again later');
    }
    
    next();
});

app.use(express.json())

app.get('/test', (req, resp) => {
    resp.send('working');
});

app.post('/park', async (req, resp) => {
    const { body: { carNo }} = req;
    if (!carNo) {
        resp.send('car number is mandatory to park the car');
    }

    const info = parkingService.parkCar(carNo);
    resp.send(info);
});

app.post('/unPark', async (req, resp) => {
    const { body: { slotNo }} = req.body.slotNo;
    if (!slotNo) {
        resp.send('slot number is mandatory to park the car');
    }

    const info = parkingService.unParkCar(Number.parseInt(slotNo));
    resp.send(info)
});

app.post('/details', async (req, resp) => {
    const { body: { carNo, slotNo }} = req;
    console.log(slotNo);
    let info = 'No Info found';
    if (carNo) {
        info = parkingService.getInfoByCarNo(carNo);
    } else if (slotNo) {
        info = parkingService.getInfoBySlotNo(Number.parseInt(slotNo));
    }
    
    resp.send(info)
});


function startApp() {
    try {
        parkingService.createLot(PARKING_SIZE);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = {
    startApp
};
