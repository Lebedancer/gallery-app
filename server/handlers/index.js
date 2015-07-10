var http = require('http');
var fs = require('fs');
var path = require('path');
var logs = require('../libs/log')(module);
var config = require('../config');

var dbPath = path.join(__dirname + '/../data/' + config.get('db'));

module.exports = function() {
    return {
        get: get,
        add: add,
        search: search,
        remove: remove,
        reshape: reshape
    };
};

/** Total gallery */
var get = function(req, res, next) {
    fs.readFile(dbPath, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
            var resultData;

            if (data.length) {
                resultData = JSON.parse(data);
            } else {
                resultData = []
            }

            res.send(resultData);
        } else {
            logs.error(err);
            next(err);
        }
    });
};

/**
 * Add img to gallery
 */
var add = function(req, res, next) {
    var body = req.body;

    fs.readFile(dbPath, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {

            var resultData;
            var newId;

            if (data.length) {
                resultData = JSON.parse(data);
            } else {
                resultData = []
            }

            resultData.push(body);
            resultData.forEach(function(obj) {
                return newId = obj.id = obj.pid;
            });
            resultData = JSON.stringify(resultData);

            fs.writeFile(dbPath, resultData, function(err) {
                if (err) {
                    throw err;
                }
                res.send({
                    Status: true,
                    id: newId
                });
            });

        } else {
            logs.error(err);
            next(err);
        }
    });
};

var remove = function(req, res, next) {
    var id = req.params.id;

    fs.readFile(dbPath, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
            var resultData;

            if (data.length) {
                resultData = JSON.parse(data);

                resultData.forEach(function(obj, ind) {
                    if (obj.id == id) {
                        resultData.splice(ind, 1);
                    }
                });

                resultData = JSON.stringify(resultData);

                fs.writeFile(dbPath, resultData, function(err) {
                    if (err) {
                        throw err;
                    }
                    res.send({Status: true});
                });
            } else {
                res.sendStatus(500);
            }
        } else {
            logs.error(err);
            next(err);
        }
    });
};

/** @access private */
var search = function(req, res, next) {
    var query = encodeURIComponent(req.query.q);

    var options = {
        host: 'api.vk.com',
        path: '/method/photos.search?q=' + query + '&count=30',
        method: 'GET'
    };

    var request = http.request(options, function(response) {
        var body = '';
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            var data = getFormatedData(body);
            res.send(data);
        });
    });
    request.on('error', function(e) {
        logs.error('Problem with request: ' + e.message);
        next(e);
    });
    request.end();
};

/** Total gallery */
var reshape = function(req, res, next) {
    var patternArray = req.body.patternArr;

    fs.readFile(dbPath, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {

            var resultData;

            if (data.length) {
                resultData = JSON.parse(data);
            }

            resultData = resultData.map(function(item) {
                var n = patternArray.indexOf(item.id);
                patternArray[n] = '';
                return [n, item]
            }).sort().map(function(j) {
                return j[1]
            });

            resultData = JSON.stringify(resultData);

            fs.writeFile(dbPath, resultData, function(err) {
                if (err) {
                    throw err;
                }
                res.send({Status: true});
            });
        } else {
            logs.error(err);
            next(err);
        }
    });
};

function getFormatedData(data) {
    var dataObj = JSON.parse(data);
    var respArr = dataObj.response;

    if (respArr.length) {
        respArr.shift();
    }

    return respArr;
}
