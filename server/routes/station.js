'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StationModel = require('../models/stationModel');
const mongoDB = 'mongodb://localhost/Sunshine-Daydream-DB';
const requestPromise = require('request-promise');
const buildReportRequest = require('../snotel_library/snotelLibrary');

mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/', function(req, res){

    //options not defined.  Can I build "buildReportRequest" to take a callback function?   
    // buildReportRequest(options=>{
    //    requestPromise()
    //    .then(function (response) {
    //    console.log('Got report!');
    //    res.status(200).send(response);
    //     })//end then
    //     .catch(function (err) {
    //         console.log(`ERROR: ${err}`);
    //         res.status(500).send(err)
    //       });//end catch
    // })//end ideal call back implementation of buildReportRequest
    // buildReportRequest()

    const options = buildReportRequest('672:WA:SNTL', '2');
    requestPromise(options)
    .then(function (response) {
      console.log('Got report!');
      res.status(200).send(response);
    })
    .catch(function (err) {
      console.log(`ERROR: ${err}`);
      res.status(500).send(err)
    });
    
    // res.status(200).send();

    // StationModel.
    // find(function(err, users){
    //     
    // });

});

//TODO  wind direction and speed gauges
//TODO use most recent data and greyed out text if the data point is old

router.post('/', function(req, res) {
 
    const bodyObj = {
        ceId: req.body.id,
        formulaInstanceId: req.body.email,
        status: req.body.status,
        createdDate: req.body.createdDate,
        updatedDate: req.body.updatedDate,
        elementInstanceId: req.body.elementInstanceId
    };
    const newStation = new StationModel(bodyObj);
    
    newStation
    .save(function(err) { 
        if (err){
            res.status(500).send("Something went wrong while attempting to POST to the Database"); 
        } else{
            res.status(200).send("POST Succesful");
        }
    });

});

router.get('/:id', function(req, res){
//click on station on map and see current data most recent data.

        res.status(200).send(users);
});

router.get('/history/:id', function(req, res){

});


module.exports = router;