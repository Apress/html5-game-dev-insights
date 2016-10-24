;(function() {

    var fps = 30, // Define the maximum number of FPS
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
        ballRadius = 20, // Set the radius of the ball
        ballVelocityX = 15, // Velocity of the ball in the X axis
        ballVelocityY = 15, // Velocity of the ball in the Y axis
        ballPositionX = canvas.width / 2, // Position of the ball in the X axis
        ballPositionY = canvas.height / 2; // Position of the ball in the Y axis

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

            // There's no need to go through all this logic on every frame
            shouldRepaint = false;

            console.time("Painting Scene");

            // Paint the image on the canvas
            ctx.drawImage(backgroundTexture,
                          0,
                          0);

            // If the position of the ball in the X axis minus its radius
            // multipled by 2 is less than 0, or it's bigger than the width
            // of the canvas, invert the velocity
            if (ballPositionX - (ballRadius * 2) < 0 ||
                ballPositionX + (ballRadius * 2) > canvas.width) {
                ballVelocityX *= -1;
            }

            // If the position of the ball in the Y axis minus its radius
            // multipled by 2 is less than 0, or it's bigger than the width
            // of the canvas, invert the velocity
            if (ballPositionY - (ballRadius * 2) < 0 ||
                ballPositionY + (ballRadius * 2) > canvas.height) {
                ballVelocityY *= -1;
            }

            // Add the velocity to the position in the X and Y axis
            ballPositionX += ballVelocityX;
            ballPositionY += ballVelocityY;

            // Paint the ball
            paintBall(ctx, ballRadius, ballPositionX, ballPositionY);

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

    function paintBall(ctx, r, x, y) {

        // Set the background colour to yellow
        ctx.fillStyle = '#ff0';

        // Draw the circle
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();

        // Make sure to trigger a repaint
        shouldRepaint = true;

    }

}());