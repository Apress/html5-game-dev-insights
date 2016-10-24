;(function() {

    var fps = 30, // Define the maximum number of FPS
        interval = 1000 / fps, // Calculate the interval in milliseconds
        delta = 0, // Variable initialisation
        previousTs = 0; // Variable initialisation
        shouldRepaint = true, // Set the repaint flag to true by default
        viewportWidth = 640, // Setup the width of the viewport (the canvas)
        viewportHeight = 480, // Setup the height of the viewport (the canvas)
        canvas = document.querySelector('canvas'), // Grab a reference to the canvas object...
        ctx = canvas.getContext('2d'), // ...and its context
        backgroundTexture = new Image(); // Declare a new image object that we’ll be using to store our background texture

    // Set the default size of the canvas (it will be resized when the background image is loaded)
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Load the background texture
    backgroundTexture.src = 'texture.jpg';
    backgroundTexture.addEventListener('load', function() {

        // Resize the canvas to the size of the image
        canvas.width = backgroundTexture.width;
        canvas.height = backgroundTexture.height;

        // Call requestAnimationFrame as soon as we make sure the image is loaded
        requestAnimationFrame(update);

    }, false);

    function update(ts) {

        // Calculate the delta between the previous timestamp and the new one
        delta = ts - previousTs;

        // Performing a calculation here means that it will be
        // executed every 16.67 ms. at 60 frames per second

        // Check whether or not something needs to be repainted in the scene

        // Only execute the paint routine if the delta is bigger
        // than the interval and the shouldRepaint flag is set to true
        if (delta > interval && shouldRepaint) {

            // This bit will be executed only if it's bigger than the
            // interval and therefore will be executed every 33.33 ms.
            // at 30 frames per second (or the value of the "fps" variable)

            console.time("Painting Scene");

            // Paint the image on the canvas
            ctx.drawImage(backgroundTexture,
                          0,
                          0);

            console.timeEnd("Painting Scene");

            // There's no need to go through all this logic on every frame
            shouldRepaint = false;

            // Set the previous timestamp, which will be used
            // in the "next" loop.
            // Subtract the difference between the delta and the interval
            // to account for the time that it took the computer to
            // process the function.

            previousTs = ts - (delta % interval);

        }

        // Call requestAnimationFrame again
        requestAnimationFrame(update);

    }

}());