var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('./config');



router.get('/participant', function (req, res, next) {

    runQuery('SELECT l.date, l.time, p.name, p.id as pid ' +
        'FROM participant p ' +
        'LEFT JOIN log l ON l.participantid = p.id', null, success, next);


    function success(result) {
        var participants = [];

        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows[i];

            var participant = getById(participants, row.pid);
            if (participant == null) {
                participant = {
                    id: row.pid,
                    name: row.name,
                    totalTime: 0,
                    days: {}
                };
                participants.push(participant);
            }

            participant.totalTime += row.time;

            participant.days[row.date] = row.time;
        }

        res.json(participants);
    }
});



router.post('/participant', function (req, res, next) {
    var playerName = req.body.name;

    runQuery("INSERT INTO participant(name) values(($1))", [playerName], success, next);

    function success(result) {
        console.log("Added player " + playerName);
        res.json({message: "player created"});
    }
});

router.post('/participant/:participantid/log', function (req, res, next) {
    var participantid = parseInt(req.params.participantid, 10);
    var distance = parseInt(req.body.distance, 10);
    var date = req.body.date;

    runQuery("SELECT meters FROM distancelog WHERE date = ($1) AND participantid = ($2)", [date, participantid],
        function (result) {
            if (result.rows.length > 0) {
                runQuery("UPDATE distancelog SET meters = ($1) WHERE date = ($2) AND participantid = ($3)",
                    [distance, date, participantid], success, next);
            } else {
                runQuery("INSERT INTO distancelog(meters, date, participantid) VALUES(($1), ($2), ($3))",
                    [distance, date, participantid], success, next);
            }

            function success(result) {
                console.log("Set distance to " + distance + "for p " + participantid + " at " + date);
                res.json({message: "logged distance"});
            }
        }, next);

});

function runQuery(query, values, callback, errCallback) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            done();
            errCallback(err);
            return;
        }
        client.query(query, values, function (err, result) {
            done();

            if (err) {
                errCallback(err);
            } else {
                callback(result);
            }
        });
    });
}

function getById(collection, id) {
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].id == id) {
            return collection[i];
        }
    }
    return null;
}


module.exports = router;
