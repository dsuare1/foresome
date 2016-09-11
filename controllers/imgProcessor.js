var Jimp = require('jimp');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');
var fileType = require('file-type');

module.exports = {
	convertImg(file){
		var promises = [];

		_.forEach(file, function(file) {
			var promise = new Promise(function(resolve, reject) {
				var type = fileType(file.buffer);
				new Jimp(file.buffer, function(err, image) {
					image.resize(100, 100)
						.quality(10)
						.getBuffer(type.mime, function(err, buffer) {
							var base64Image = buffer.toString('base64');
							var imgSrcString = 'data: ' + type.mime + ';base 64, ' + base64Image;
							resolve(imgSrcString);
						})
				});
			})
			promises.push(promise);
		})
		return Promise.all(promises);
	}
}