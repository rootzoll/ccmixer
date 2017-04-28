"use strict";
var express = require('express');
var serveStatic = require( "serve-static" );

var app = express();

// on root directory - serve static HTML directory
app.use('/', serveStatic('./static'));

// on 'mixer' - serve 
app.get('/mixer', function (req, res) {
    mixerAPI(req,res);
});
app.post('/mixer', function (req, res) {
    mixerAPI(req,res);
});

// mapping api to core function
var mixerAPI = function(req, res) {

	console.log(JSON.stringify(req.query));

	var inArray = new Array();
	if (typeof req.query.in != "undefined" ) {
		inArray = req.query.in;
	}

    var result =  {
	    ts: new Date().getTime(),
		input: inArray,
        output: ccMixer(inArray),
        in: JSON.stringify()
	};

    res.send(result);
};

// starting server
app.listen(3003,function(err){
	console.log('Server listening at http://localhost:3003');
});

// core function
var ccMixer = function (inArray) {

	var cczero = true;
	var ccby = true;
	var ccbysa = true;
	var ccbync = true;
	var ccbynd = true;
	var ccbyncsa = true;
	var ccbyncnd = true;


	//CREATE THREE DIMENSIONAL ARRAY!
	var combination = new Array(7);
	for (var i = 0; i < 7; i++) {
		combination[i] = new Array(7)
		for (var y = 0; y < 7; y++) {
			combination[i][y] = new Array(7)
		}
	}

	// CC-0
	combination[0][0] = [true, true, true, true, true, true, true];
	combination[0][1] = [false, true, true, true, true, true, true];
	combination[0][2] = [false, false, true, false, false, false, false];
	combination[0][3] = [false, false, false, true, false, true, true];
	combination[0][4] = [false, false, false, false, false, false, false];
	combination[0][5] = [false, false, false, false, false, true, false];
	combination[0][6] = [false, false, false, false, false, false, false];

	// CC-BY
	combination[1][0] = [false, true, true, true, true, true, true];
	combination[1][1] = [false, true, true, true, true, true, true];
	combination[1][2] = [false, false, true, false, false, false, false];
	combination[1][3] = [false, false, false, true, false, true, true];
	combination[1][4] = [false, false, false, false, false, false, false];
	combination[1][5] = [false, false, false, false, false, true, false];
	combination[1][6] = [false, false, false, false, false, false, false];

	// CC-BY-SA
	combination[2][0] = [false, false, true, false, false, false, false];
	combination[2][1] = [false, false, true, false, false, false, false];
	combination[2][2] = [false, false, true, false, false, false, false];
	combination[2][3] = [false, false, false, false, false, false, false];
	combination[2][4] = [false, false, false, false, false, false, false];
	combination[2][5] = [false, false, false, false, false, false, false];
	combination[2][6] = [false, false, false, false, false, false, false];

	// CC-BY-NC
	combination[3][0] = [false, false, false, true, false, true, true];
	combination[3][1] = [false, false, false, true, false, true, true];
	combination[3][2] = [false, false, false, false, false, false, false];
	combination[3][3] = [false, false, false, true, false, true, true];
	combination[3][4] = [false, false, false, false, false, false, false];
	combination[3][5] = [false, false, false, false, false, true, false];
	combination[3][6] = [false, false, false, false, false, false, false];

	// CC-BY-ND
	combination[4][0] = [false, false, false, false, false, false, false];
	combination[4][1] = [false, false, false, false, false, false, false];
	combination[4][2] = [false, false, false, false, false, false, false];
	combination[4][3] = [false, false, false, false, false, false, false];
	combination[4][4] = [false, false, false, false, false, false, false];
	combination[4][5] = [false, false, false, false, false, false, false];
	combination[4][6] = [false, false, false, false, false, false, false];

	// CC-BY-NC-SA
	combination[5][0] = [false, false, false, false, false, true, false];
	combination[5][1] = [false, false, false, false, false, true, false];
	combination[5][2] = [false, false, false, false, false, true, false];
	combination[5][3] = [false, false, false, false, false, true, false];
	combination[5][4] = [false, false, false, false, false, false, false];
	combination[5][5] = [false, false, false, false, false, true, false];
	combination[5][6] = [false, false, false, false, false, false, false];

	// CC-BY-NC-ND
	combination[6][0] = [false, false, false, false, false, false, false];
	combination[6][1] = [false, false, false, false, false, false, false];
	combination[6][2] = [false, false, false, false, false, false, false];
	combination[6][3] = [false, false, false, false, false, false, false];
	combination[6][4] = [false, false, false, false, false, false, false];
	combination[6][5] = [false, false, false, false, false, false, false];
	combination[6][6] = [false, false, false, false, false, false, false];

	var mixedLicenses = new Array();
	for (var i = 0; i < inArray.length; i++) {
		if (inArray[i] == "cc-0") mixedLicenses.push(0);
		if (inArray[i] == "cc-by") mixedLicenses.push(1);
		if (inArray[i] == "cc-by-sa") mixedLicenses.push(2);
		if (inArray[i] == "cc-by-nc") mixedLicenses.push(3);
		if (inArray[i] == "cc-by-nd") mixedLicenses.push(4);
		if (inArray[i] == "cc-by-nc-sa") mixedLicenses.push(5);
		if (inArray[i] == "cc-by-nc-nd") mixedLicenses.push(6);
	}

	for (var i = 0; i < mixedLicenses.length; i++) {
		for (var n = 0; n < 7; n++) {
			var a = mixedLicenses[0];
			var b = mixedLicenses[i];
			var check = combination[a][b][n];
			if ((n == 0) & (!check)) { cczero = false; }
			if ((n == 1) & (!check)) { ccby = false; }
			if ((n == 2) & (!check)) { ccbysa = false; }
			if ((n == 3) & (!check)) { ccbync = false; }
			if ((n == 4) & (!check)) { ccbynd = false; }
			if ((n == 5) & (!check)) { ccbyncsa = false; }
			if ((n == 6) & (!check)) { ccbyncnd = false; }
		}
	}

	var result = new Array();
	if (cczero) result.push("cc-0");
	if (ccby) result.push("cc-by");
	if (ccbysa) result.push("cc-by-sa");
	if (ccbync) result.push("cc-by-nc");
	if (ccbynd) result.push("cc-by-nd");
	if (ccbyncsa) result.push("cc-by-nc-sa");
	if (ccbyncnd) result.push("cc-by-nc-nd");

	return result;
};