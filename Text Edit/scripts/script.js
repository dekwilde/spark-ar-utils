// Load in the required modules
const Scene = require('Scene');
const NativeUI = require('NativeUI');
const TouchGestures = require('TouchGestures');

// Enables async/await in JS [part 1]
(async function() {

    // Create a variable to store the name of our text object, in this example '2dText0'
    const textNodeName = '2dText0';

    // Create a reference to the text object in our Scene
    const textObject = await Scene.root.findFirst(textNodeName);

    // Change the initial text displayed
    NativeUI.setText(textNodeName, 'Tap to edit');

    // Register a tap gesture on the text object
    TouchGestures.onTap(textObject).subscribe( () => {
          
        // Use the NativeUI module to edit the text displayed based on user input
        NativeUI.enterTextEditMode(textNodeName);
    });

// Enables async/await in JS [part 2]
})();