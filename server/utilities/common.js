var fs = require('fs');
var lwip = require('lwip');

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

  var dir = "images/user_"+userId;
  var thumbs_dir = "images/user_"+userId+"/thumbs";
  var path = dir+"/"+name;
  var thumbs_path = thumbs_dir+"/"+name;


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

var processinng = processImage(path,thumbs_path);

  return name;
},

}

function processImage(img,thumb){


    lwip.open(img, function(err, image){

      // check err...
      // manipulate image:
      if(err)
      console.log("Load error");
      if(image)
      image.batch()

  .scale(0.20)          // scale to 75%

  .writeFile(thumb, function(err,image){
    // check err...
    // done.
    if(err)
    console.log("Error here");
  });
    });

}

module.exports = common;
