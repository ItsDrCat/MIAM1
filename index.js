//hello there! again...
const { createRequire } = require('node:module');
require = createRequire(__filename); 

//node.js packages
var Jimp = require("jimp");
const punycode = require('punycode/');
var fs = require('fs');

//set up config stuffs
const { fileName } = require('./config.json');
const { itemName } = require('./config.json');
const { debug } = require('./config.json');
const { isTool } = require('./config.json');
const { generateDepth } = require('./config.json');
const { depthIntensity } = require('./config.json');

//log a few thingies
console.log("STARTING!")
console.log("Looking for: " + fileName)

//MAKE MODEL
//open image file
let isFirst = true
Jimp.read(fileName, (err, fileName) => {
  if (err) throw err;
  fileName
    .resize(16, 16) // resize
    .greyscale() // set greyscale

        //start item model file
        var writeStream = fs.createWriteStream("output/" + itemName + ".geo.json");
            writeStream.write('{\r\n"format_version": "1.16.0",\r\n"minecraft:geometry": [\r\n{\r\n"description": {\r\n"identifier": "geometry.generated.'+ itemName +'",\r\n"texture_width": 16,\r\n"texture_height": 16,\r\n"visible_bounds_width": 2,\r\n"visible_bounds_height": 3.5,\r\n\"visible_bounds_offset": [0, 1.25, 0]\r\n},\r\n"bones": [\r\n{\r\n"name": "root_item",\r\n"pivot": [0, 0, 0],\r\n"binding": "q.item_slot_to_bone_name(c.item_slot)",\r\n"cubes": [')
    
            fileName.scan(0, 0, fileName.bitmap.width, fileName.bitmap.height, function (x, y, idx) { //scan

        //get pixel colors
        var red = this.bitmap.data[idx + 0];
        var green = this.bitmap.data[idx + 1];
        var blue = this.bitmap.data[idx + 2];
        var alpha = this.bitmap.data[idx + 3];
        
        //debugs pixel stuff for me lol
        if(debug){
        console.log(red)
        console.log(green)
        console.log(blue)
        console.log(alpha)
        }

        //calculate depth stuff
        let depthPos = 0
        let depth = 1
        
        if(generateDepth){
        let colorAverage = (red+green+blue)/3
        depth = colorAverage*depthIntensity
        depthPos = -(depth-1)/2
        }
        //add cubes
        if(alpha > 0){
            let xSum = x + -8
            let ySum = y + -8
            if(isFirst){
                    writeStream.write('\r\n{"origin": ['+ xSum +', '+ depthPos +','+ ySum +'], "size": [1, '+ depth +', 1], "uv": {"north": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"south": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"east": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"west": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"up": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"down": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]}}}')
                isFirst = false
            }else{
                    writeStream.write(',\r\n{"origin": ['+ xSum +', '+ depthPos +','+ ySum +'], "size": [1, '+ depth +', 1], "uv": {"north": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"south": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"east": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"west": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"up": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]},"down": {"uv": ['+ x+ ','+ y +'], "uv_size": [1, 1]}}}')          
            }
        }


        //check if scan is finished
        if (x == fileName.bitmap.width - 1 && y == fileName.bitmap.height - 1) {
            //finish and end file
                for(let i = 0; i < 3; i++){
                    writeStream.write('\r\n]\r\n}')
                }
                writeStream.end()
          }
});
});

//MAKE ANIMATION
if(!isTool){

    var writeStream = fs.createWriteStream("output/" + itemName + ".animation.json");
    writeStream.write('{\r\n"format_version": "1.8.0",\r\n"animations": {\r\n"animation.'+ itemName +'.hold_first_person": {\r\n"loop": true,\r\n"bones": {\r\n"root_item": {\r\n"rotation": [-58.80679, -0.39117, 200],\r\n"position": [2, 17, 7],\r\n"scale": 1.4\r\n}\r\n}\r\n},\r\n"animation.'+ itemName +'.hold_third_person": {\r\n"loop": true,\r\n"bones": {\r\n"root_item": {\r\n"rotation": [16.79959, 8.25534, 192.18927],\r\n"position": [2.4, 23.5, -5.5],\r\n"scale": 0.55\r\n}}}}}')
    writeStream.end()

}else{

    var writeStream = fs.createWriteStream("output/" + itemName + ".animation.json");
    writeStream.write('{\r\n"format_version": "1.8.0",\r\n"animations": {\r\n"animation.'+ itemName +'.hold_first_person": {\r\n"loop": true,\r\n"bones": {\r\n"root_item": {\r\n"rotation": [-58.80679, -0.39117, 200],\r\n"position": [2, 17, 7],\r\n"scale": 1.4\r\n}\r\n}\r\n},\r\n"animation.'+ itemName +'.hold_third_person": {\r\n"loop": true,\r\n"bones": {\r\n"root_item": {\r\n"rotation": [2.11341, 55.03749, 88.24213],\r\n"position": [-0.2, 23, -7],\r\n"scale": 0.95\r\n}}}}}')
    writeStream.end()

}

//MAKE ATTACHABLE
var writeStream = fs.createWriteStream("output/" + itemName + ".attachable.json");
writeStream.write('{\r\n"format_version": "1.10.0",\r\n"minecraft:attachable": {\r\n"description": {\r\n"identifier": "minecraft:'+ itemName +'",\r\n"render_controllers": ["controller.render.item_default"],\r\n"materials": {\r\n"default": "entity_alphatest",\r\n"enchanted": "entity_alphatest_glint"\r\n},\r\n"textures": {\r\n"default": "textures/entity/attachable/'+ itemName +'",\r\n"enchanted": "textures/misc/enchanted_item_glint"\r\n},\r\n"geometry": {\r\n"default": "geometry.generated.'+ itemName +'"\r\n},\r\n"animations": {\r\n"first_person_hold": "animation.'+ itemName +'.hold_first_person",\r\n"third_person_hold": "animation.'+ itemName +'.hold_third_person"\r\n},\r\n"scripts": {\r\n"animate": [\r\n{\r\n"first_person_hold": "c.is_first_person"\r\n},\r\n{\r\n"third_person_hold": "!c.is_first_person"\r\n}\r\n]}}}}')
