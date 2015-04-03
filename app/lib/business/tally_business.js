/*jslint node: true */
// Logger =============================================================
var log = require('../../../config/logger.js');

// Modules ============================================================
var async = require('async');

// DB Models ==========================================================
var Election = require('../../models/elections_model');
var Vote = require('../../models/votes_model');

// Variables ==========================================================
var votes;

// Functions ==========================================================

//TODO - Make this work
// Tally election by _id
function tallyElectionResultsById(res, election_id) {
    async.series([
        function(next){
            console.log("setting votes");
            setVotes(election_id, next);
        },
        function(next){
            console.log("getting winner");
            res.send(votes);
            getWinner(next);
        }
    ],
    function (err) {
        //save election results
    });
}

function setVotes(election_id, callback) {
    async.series([
        function(callback){
            // use mongoose to get an vote by id
            Vote.find({'election_id':election_id}, function(err, vote) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    callback(err);
                }

                votes = JSON.stringify(vote);
                callback();

            });
        }
    ],
    function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//TODO
function getWinner() {
    async.series([
        function(callback){
            tallyVotes();
            callback();
        }
    ],
    function (err, results) {
        async.whilst(
            function () {return !winner;},
            function (callback) {
                newRound();
                callback();
            },
            function (err) {
                //save winner
            }
        );
    });
}

//TODO
function newRound() {
    async.series([
        function(callback){
            dropVotes();
            callback();
        },
        function(callback){
            tallyVotes();
            callback();
        }
    ],
    function (err) {
        if (err) {
            res.send(err);
        } else {
            //no error, complete newRound
        }
    });
}

//TODO
function dropVotes() {
    async.series([
        function(callback){
            //remove all candidates[0] from votes
            callback();
        }
    ],
        function (err) {
            if (err) {
                res.send(err);
            } else {
                //no error, complete dropVotes
            }
        });
}

//TODO
function tallyVotes() {
    async.series([
        function(callback){
            //count all candidates[0]
            callback();
        },
        function(callback){
            //check if there is majority winner and set winner
            callback();
        }
    ],
        function (err) {
            if (err) {
                res.send(err);
            } else {
                //no error, complete tallyVotes
            }
        });
}

module.exports = {
    tallyElectionResultsById: tallyElectionResultsById
};