+-+-+-+ HOW TO USE +-+-+-+

1. Open config.json, you should see a structure like this:

	{
    		"fileName": "input/cake.png",  <<< Name of the image you want to generate from.
    		"itemName": "cake",            <<< Generated files' names (should be about the same as "fileName").
    		"generateDepth": true,         <<< Generates the model with a extruded cubes to show depth.
    		"isTool": false,               <<< Generates animation file with tool animation.
    		"depthIntensity": 0.008,       <<< The intensity of "generateDepth".
   		"debug": true   	       <<< Shows debug data in console.
	}

2. Edit config.json to preffered options.

3. Run MIAM1.exe (Should result in usable files in output folder)


NOTE: MIAM1 uses attachables to mimic the looks of items. This does have the side-effect of having weird looking swing animations. As of the release of this software this can't be fixed. MIAM1 is not reccomended for bulky or tool items, but will work anyways.

MIAM1 is created by: ItsDrCat
https://discord.gg/ht7sEmWX4C (Cat's Labs Discord)