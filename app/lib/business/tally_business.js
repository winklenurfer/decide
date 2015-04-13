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
var votesParsed;
var tally = {};
var winner = false;

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
            getWinner2(next);
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

//TODO - Currently calls second series before first finishes. May need to use waterfall.
function getWinner(callback) {
    async.waterfall([
        function(next){
            tallyVotes(next);
        },
        function(next){
            async.whilst(
                function () {return !winner;},
                function (callback) {
                    newRound(next);
                    callback();
                },
                function (err) {
                    //save winner
                }
            );
            callback();
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
function newRound() {
    async.series([
        function(next){
            dropVotes(next);
        },
        function(next){
            tallyVotes(next);
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
            winner = true;
            console.log("dropVotes");
            //remove all candidates[0] from votes
            callback();
        }
    ],
        function (err) {
            if (err) {
                res.send(err);
                callback(err);
            } else {
                callback(null);
            }
        });
}

function tallyVotes(callback) {
    async.waterfall([
        function(callback){
            //count all candidates[0]
            var tally = {};
            votesParsed = JSON.parse(votes);
            for (var i = 0; i < votes.length; i++) {
                if (tally.hasOwnProperty(votes[i].candidates[0])) {
                    tally[votes[i].candidates[0]] += 1;
                }
                else {
                    tally[votes[i].candidates[0]] = 1;
                }
            }
            callback(null, tally);
        },
        function(tally, callback){
            //check if there is majority winner and set winner
            console.log(tally);
            var totalVotes = 0;
            for (var vote in tally) {
                totalVotes += tally[vote];
            }
            console.log(totalVotes);
            for (vote in tally) {
                if ((tally[vote]/totalVotes) > '.5') {
                    winner = true; //TODO - Set winner and update DB record
                } else {
                    console.log("Not majority: " + tally[vote]/totalVotes);
                }
            }
            console.log(totalVotes);

            callback(null);
        }
    ],
    function (err) {
        if (err) {
            res.send(err);
            callback(err);
        } else {
            callback(null);
        }
    });
}

// 2 //

//TODO - Currently calls second series before first finishes. May need to use waterfall.
function getWinner2(callback) {
    console.log("getWinner2");
    tallyVotes2();
    while (!winner) {
        newRound2();
    }
    callback();
}

//TODO
function newRound2() {
    console.log("newRound2");
    dropVotes2();
    tallyVotes2();
}

//TODO
function dropVotes2() {

    //TODO NOW - need to find the key where the value is lowest then loop through the votesParsed and splice the first element when it equals the key
    console.log("dropVotes2");
    console.log("votesParsed:", votesParsed);
    console.log("TALLY", tally);
    var low = '';
    for (var number in tally) {
        if (low === '') {
            low = number;
        }
        if (number > low) {
            low = '';
        }
    }

    for (var i = 0; i < votesParsed.length; i++) {
//        console.log("~~~");
//        console.log(votesParsed[i].candidates);
//        votesParsed[i].candidates.splice(0,1);
//        console.log(votesParsed[i].candidates);
//        console.log("~~~");
    }

    winner = true;
}

function tallyVotes2() {
    console.log("tallyVotes2");
    //count all candidates[0]
    tally = {};
    votesParsed = JSON.parse(votes);
    for (var i = 0; i < votesParsed.length; i++) {
        if (tally.hasOwnProperty(votesParsed[i].candidates[0])) {
            tally[votesParsed[i].candidates[0]] += 1;
        }
        else {
            tally[votesParsed[i].candidates[0]] = 1;
        }
    }

    console.log(tally);
    var totalVotes = 0;
    for (var vote in tally) {
        totalVotes += tally[vote];
    }
    console.log(totalVotes);
    for (vote in tally) {
        if ((tally[vote]/totalVotes) > '.5') {
            winner = true; //TODO - Set winner and update DB record
        } else {
            console.log("Not majority: " + tally[vote]/totalVotes);
        }
    }
    console.log(totalVotes);
}

// 2 //

module.exports = {
    tallyElectionResultsById: tallyElectionResultsById
};