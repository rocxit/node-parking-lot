#### Start the application by command `npm start`

1. localhost:8000/park

reqBody: {
    carNo: <carNo>
}

2. localhost:8000/unPark

reqBody: {
    slotNo: <slotNo>
}

3. localhost:8000/details

reqBody: {
    slotNo: <slotNo>
}
or
reqBody: {
    carNo: <carNo>
}

#### Run the test cases by command `npm test`


#### .env file
update the .env file as per requirement

PORT:- port number
MAX_REQ_LIMIT_TIME_SEC :- Max request time frame
MAX_NO_REQ:- Max number of request a user can makes in the Max request time frame
PARKING_SIZE:- parking slot size
