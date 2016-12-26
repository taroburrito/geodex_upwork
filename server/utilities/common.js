var fs = require('fs');
var Jimp = require("jimp");
var path = require('path');
var clientDir = path.join(__dirname, '../../', 'client/uploads/images');
var httpRequest = require('request');

var common = {
decodeBase64Image: function(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
},

uploadPostImage:function(imageData,userId){
  var base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  var ext = imageData.split(';')[0].match(/jpg|jpeg|png|gif/)[0];
  var name = Date.now()+"."+ext;

  var dir = clientDir+"/user_"+userId;
  var thumbs_dir = clientDir+"/user_"+userId+"/thumbs";
  var path = dir+"/"+name;
  var thumbs_path = thumbs_dir+"/"+name;
  console.log(clientDir);

  // check if dir already exists
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, 0766, function(err){
        if(err){
            console.log(err);
        }
    });
}
  // check if dir already exists
if(!fs.existsSync(thumbs_dir)){
  fs.mkdirSync(thumbs_dir, 0766, function(err){
      if(err){
          console.log(err);
      }
  });
}

  fs.writeFileSync(path, base64Data, 'base64',(err,data) => {
    if(err){
      return err;
    }
  return name;
});

// process image

var thumbImage = processImage(path,thumbs_path);

  return name;
},


uploadYoutubePostImage:function(imageData,userId){

//   fs.readFile(imageData, function(err, data) {
//   if (err) throw err;
//
//   // Encode to base64
//   var base64Data = new Buffer(imageData, 'binary').toString('base64');
// });
//  var base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  var ext = "jpg";
  var name = Date.now()+"."+ext;

  var dir = clientDir+"/user_"+userId;
  var thumbs_dir = clientDir+"/user_"+userId+"/thumbs";
  var path = dir+"/"+name;
  var thumbs_path = thumbs_dir+"/"+name;
  //console.log(clientDir);

  // check if dir already exists
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, 0766, function(err){
        if(err){
            console.log(err);
        }
    });
}
  // check if dir already exists
if(!fs.existsSync(thumbs_dir)){
  fs.mkdirSync(thumbs_dir, 0766, function(err){
      if(err){
          console.log(err);
      }
  });
}

// simple HTTP GET request for the image URL
httpRequest.get({url: imageData, encoding: 'binary'}, function (err, httpResponse, body) {

  fs.writeFile(thumbs_path, body, 'binary', function(err) {
    if(err) {
      console.log('Error: '+err);
    } else {
      console.log('Saved image');
    }
  });
});
return name;
},

}

function processImage(img,dest){


  Jimp.read(img).then(function (image) {
  // do stuff with the image
  image.write(img);
   image.resize(185,152)
        .write(dest); // save
  }).catch(function (err) {
  return err;
  });

}


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

module.exports = common;
