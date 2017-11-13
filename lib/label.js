/* global Buffer */
'use strict';

var PDFDocument = require('pdfkit');
var moment = require('moment');

module.exports = function(data) {

	return new Promise(function(resolve, reject) {

		var bufs = [];
		var doc = new PDFDocument({
			size: [175.691, 283.436], // 100 x 62 mm in 'PDF points'
			margin:0,
			layout: 'landscape'
		});
		doc.registerFont('OpenSans-Regular', 'fonts/OpenSans-Regular.ttf');
		doc.registerFont('OpenSans-Bold', 'fonts/OpenSans-Bold.ttf');

		// Draw rectangle at bottom, fill black
		doc.rect(0, 127, 283, 48).fill("black");
		doc.image('/Users/cledwyn/code/eventbadge/lib/logo_horiz.png', {
		   fit: [150, 200],
		   align: 'center',
		   valign: 'top'
		});


		/* Getting the correct path values for imported SVGs:
         *
         * 1. Set up the correct sized canvas in Method Draw (http://editor.method.ac/), using pixels as PDF points
         * 2. Import the SVG and position it in the right place
         * 3. File > Save to generate the SVG
         * 4. Inspect it to get the paths and convert to doc.path syntax from pdfkit docs
         */



		// Add LWP logo top right

		// Add event text to black bar, in white
		doc.fillColor('white');
		doc.fontSize(10);
		doc.font('OpenSans-Bold');
		doc.text(data.eventName, 15, 139);
		doc.text(moment(data.eventDate).format('Do MMMM YYYY'), 15, 153);
		doc.fontSize(25);
		doc.text('GDG', 205, 135);


		// Add name of attendee
		doc.fillColor('black');
		doc.fontSize(32);
		doc.font('OpenSans-Bold');
		doc.text(data.givenName.toUpperCase(), 30, 50);
		doc.fontSize(20);
		doc.font('OpenSans-Regular');
		doc.text(data.familyName, 30, 85);


		// Add FT logo in white to the black bar
//		doc.path('M0.7-52.6C0.7-23.6,25-0.1,54-0.1c16,0,27.4-6.3,36-14.5L79.8-24.7C73.7-18.9,65.4-14.4,54-14.4,-21.1,0-37.6-17-37.6-38.1c0-21.1,16.5-38.1,37.6-38.1c13.7,0,21.5,5.5,26.5,10.5c4.1,4.1,6.8,10,7.8,18H54v14.3h48.3,0.5-2.6,0.8-5.6,0.8-9c0-10.8-2.9-24.1-12.4-33.5C81.4-99.9,69.6-105,54-105C25-105,0.7-81.5,0.7-52.6z').fill('grey');


		doc.on('data', function(chunk) { bufs.push(chunk); });
		doc.on('end', function() { resolve(Buffer.concat(bufs)); });

		doc.end();
	});
};

