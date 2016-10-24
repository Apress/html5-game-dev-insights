;(function() {

    var fps = 15, // Define the maximum number of FPS
        interval = 1000 / fps, // Calculate the interval in milliseconds
        delta = 0, // Variable initialisation
        previousTs = 0; // Variable initialisation
        shouldRepaint = true, // Set the repaint flag to true by default
        viewportWidth = 640, // Setup the width of the viewport (the canvas)
        viewportHeight = 480, // Setup the height of the viewport (the canvas)
        ballRadius = 10, // Radius of the ball
        canvas = document.querySelector('canvas'), // Grab a reference to the canvas object...
        ctx = canvas.getContext('2d'), // ...and its context
        backgroundTexture = new Image(), // Declare a new image object that we’ll be using to store our background texture
        pixelGroups = {}, // We'll be storing the groups of pixels (by colour) in this variable
        colourIndexes = ['4766b5', '3e589a', '354c87', '2e4276', '2a3c6c', '22325a'], // This will be our palette
        currentColourOrder = colourIndexes.slice(0); // This is the current order (we'll be using this variable to shift the colours)

    // Set the default size of the canvas (it will be resized when the background image is loaded)
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Load the background texture
    backgroundTexture.src = 'texture.gif';
    backgroundTexture.addEventListener('load', function() {

        var i = 0,
            j = 0,
            backgroundTextureData = null;

        // Paint the image on the canvas for the first time)
        ctx.drawImage(backgroundTexture,
                      0,
                      0);

        backgroundTextureData = ctx.getImageData(0, 0, backgroundTexture.width, backgroundTexture.height);
        backgroundTextureData = backgroundTextureData.data;

        // Resize the canvas to the size of the image
        canvas.width = backgroundTexture.width;
        canvas.height = backgroundTexture.height;

        // Group pixels by colour
        // (keep in mind that there's a much faster way to cycle through
        // all these pixels using typed arrays, I'm keeping it "simple" for
        // the sake of clarity
        for ( ; i < backgroundTexture.height ; ++i ) {

            for ( j = 0 ; j < backgroundTexture.width ; ++j ) {

                var red = backgroundTextureData[((backgroundTexture.width * i) + j) * 4],
                    green = backgroundTextureData[((backgroundTexture.width * i) + j) * 4 + 1],
                    blue = backgroundTextureData[((backgroundTexture.width * i) + j) * 4 + 2],
                    hex = numberToHexadecimalValue(red) + numberToHexadecimalValue(green) + numberToHexadecimalValue(blue);

                if (pixelGroups[hex] === undefined) {
                    pixelGroups[hex] = [];
                }

                pixelGroups[hex].push({ x: i, y: j });

            }

        }

        // Paint the image on the canvas again
        ctx.drawImage(backgroundTexture,
                      0,
                      0);

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

            var i = 0;

            // This bit will be executed only if it's bigger than the
            // interval and therefore will be executed every 33.33 ms.
            // at 30 frames per second (or the value of the "fps" variable)

            // There's no need to go through all this logic on every frame
            shouldRepaint = false;

            console.time("Painting Scene");

            // Shift the order by one item (grab the first value and put it last)
            var firstValue = currentColourOrder[0];

            // Remove the first value of the order array
            currentColourOrder.splice(0, 1);

            // And place it last
            currentColourOrder.push(firstValue);

            for ( ; i < currentColourOrder.length ; ++i ) {

                paintPixels(currentColourOrder[i], pixelGroups[colourIndexes[i]]);

            }

            shouldRepaint = true;

            console.timeEnd("Painting Scene");

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

    function numberToHexadecimalValue(num) {

        var h = num.toString(16);

        // If toString(16) returns a single digit, add a 0 before it
        return (h.length === 1) ? "0" + h : h;

    }

    function paintPixels(newColour, pixels) {

        var i = 0;

        for ( ; i < pixels.length ; ++i ) {

            ctx.fillStyle = '#' + newColour;

            ctx.fillRect(pixels[i].y,
                         pixels[i].x,
                         1,
                         1);

        }

    }

}());