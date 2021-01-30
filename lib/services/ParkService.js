const ParkingLot = require('./ParkingLot');

class ParkingService {
    constructor() {
        this.parkingLots = [];
    }

    createLot(noOfLot) {
        if (noOfLot < 1) {
            throw new Error('Minimum one slot is required to create parking slot');
        }
        
        this.parkingLots = new Array(Number.parseInt(noOfLot));
        console.log(`Parking Lot created with ${noOfLot} slots`);
    }

    parkCar(regNo) {
        const lotNo = this.parkingLots.findIndex(slot => !slot);;
        if (lotNo === -1) {
            return 'Parking lot is full';
        }

        const isAlreadyParked = this.parkingLots.findIndex(val => val?.regNo === regNo) > -1;

        if (isAlreadyParked) {
            return `Car Number: ${regNo} is already parked`;
        }

        const parkingLot = new ParkingLot(regNo, lotNo);
        this.parkingLots[lotNo] = parkingLot;
        return `Slot Number: ${lotNo+1}`;
    }

    unParkCar(lotNo) {
        const actualLot = lotNo-1;
        const info = this.parkingLots[actualLot];
        if (!info) {
            return 'Invalid slot number';
        }
        
        this.parkingLots[actualLot] = undefined;
        return `Car Number: ${info.regNo}`;
    }

    getInfoBySlotNo(lotNo) {
        const actualLot = lotNo-1;
        const info = this.parkingLots[actualLot];
        if(!info) {
            return 'Invalid slot number';
        }

        return `carNo = ${info.regNo}, slotNo = ${info.lotNo+1}`;
    }

    getInfoByCarNo(regNo) {
        const lotNo = this.parkingLots.findIndex((val) => val.regNo === regNo);
        const info = this.parkingLots[lotNo];
        if(!info) {
            return 'Invalid car number';
        }

        return `carNo = ${info.regNo}, slotNo = ${info.lotNo+1}`;
    }
}

module.exports = ParkingService;

