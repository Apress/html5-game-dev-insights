;(function() {

    var fps = 30, // Define the maximum number of FPS
        interval = 1000 / fps, // Calculate the interval in milliseconds
        delta = 0, // Variable initialisation
        previousTs = 0; // Variable initialisation
        shouldRepaint = true, // Set the repaint flag to true by default
        Grid = [], // Initialize an array where we're going to be storing the grid values
        gridCols = 15, // Setup the number of columns of the grid
        gridRows = 10, // Setup the number of rows of the grid
        viewportWidth = 640, // Setup the width of the viewport (the canvas)
        viewportHeight = 480, // Setup the height of the viewport (the canvas)
        cellWidth = (viewportWidth / gridCols) >> 0, // The width of each cell is calculated dynamically with the width of the canvas. Floor the result.
        cellHeight = (viewportHeight / gridRows) >> 0, // The height of each cell is calculated dynamically with the height of the canvas. Floor the result.
        playerRadius = 60, // Our player is going to be a circle. Set the radius.
        playerPositionX = (cellWidth * gridCols) - playerRadius, // Position the player within the map
        playerPositionY = (cellHeight * gridRows) - playerRadius, // Position the player within the map
        playerVelocityX = 0, // Velocity of the player's movements in the X axis
        playerVelocityY = 0, // Velocity of the player's movements in the Y axis
        playerVelocityLimit = 2, // Limit the acceleration
        canvas = document.querySelector('canvas'), // Grab a reference to the canvas object...
        ctx = canvas.getContext('2d'), // ...and its context
        i = 0, // Declare counters for the for loop we'll be using below
        j = 0; // Declare counters for the for loop we'll be using below

    // Set the size of the canvas
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Initialize the grid. By default, it will be empty,
    // so we'll need to "paint" all the cells
    for ( ; i < gridRows ; ++i ) {

        for ( j = 0 ; j < gridCols ; ++j ) {

            if (Grid[i] === undefined) {
                Grid[i] = [];
            }

            // Flag all the cells as "modified"
            Grid[i][j] = 1;

        }

    }

    // Call the update loop for the first time
    requestAnimationFrame(update);

    // Listen for keydown
    window.addEventListener('keydown', function(e) {

        var diff = 0.2;

        switch(e.keyCode) {
            case 37: // Left
            case 65: // W
                playerVelocityX -= diff;
                break;
            case 39: // Right
            case 68: // D
                playerVelocityX += diff;
                break;
            case 38: // Up
            case 87: // W
                playerVelocityY -= diff;
                break;
            case 40: // Down
            case 83: // S
                playerVelocityY += diff;
                break;
        }

        // Make sure the acceleration in the X axis is limited
        if (Math.abs(playerVelocityX) > playerVelocityLimit) {
            playerVelocityX = (playerVelocityX < 0) ? (playerVelocityLimit * -1) : playerVelocityLimit;
        }

        // Make sure the acceleration in the Y axis is limited
        if (Math.abs(playerVelocityY) > playerVelocityLimit) {
            playerVelocityY = (playerVelocityY < 0) ? (playerVelocityLimit * -1) : playerVelocityLimit;
        }

    }, false);

    function update(ts) {

        // Calculate the delta between the previous timestamp and the new one
        delta = ts - previousTs;

        // Performing a calculation here means that it will be
        // executed every 16.67 ms. at 60 frames per second

        // Check whether or not something needs to be repainted in the scene

        // if the velocity of the player is different than 0, we need to repaint the frame
        if (playerVelocityX !== 0 || playerVelocityY !== 0) {
            playerPositionX += playerVelocityX;
            playerPositionY += playerVelocityY;

            shouldRepaint = true;
        }

        // Only execute the paint routine if the delta is bigger
        // than the interval and the shouldRepaint flag is set to true
        if (delta > interval && shouldRepaint) {

            // This bit will be executed only if it's bigger than the
            // interval and therefore will be executed every 33.33 ms.
            // at 30 frames per second (or the value of the "fps" variable)

            // Paint the "background"
            var i = 0,
                j = 0;

            for ( ; i < gridRows ; ++i ) {

                for ( j = 0 ; j < gridCols ; ++j ) {

                    if (Grid[i][j] === 1) {

                        paintCell(ctx,
                                  j * cellWidth,
                                  i * cellHeight,
                                  cellWidth,
                                  cellHeight);

                        // Set that position as painted
                        Grid[i][j] = 0;

                    }

                }

            }

            // Paint the "player"
            paintPlayer(ctx, playerPositionX, playerPositionY);

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

    function paintCell(ctx, x, y, w, h) {

        // Set the colour to blue
        ctx.strokeStyle = '#00F';

        // Instead of drawing straight lines, draw dashed lines instead
        w -= (cellWidth / 2);
        h -= (cellWidth / 2);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y + h);
        ctx.stroke();

        // Set the colour to gray
        ctx.strokeStyle = '#ccc';

        // Draw an outline
        w += (cellWidth / 2);
        h += (cellWidth / 2);

        ctx.strokeRect(x, y, w, h);

    }

    function paintPlayer(ctx, x, y) {

        var l = ((x - playerRadius) / cellWidth) >> 0, // Grab the left corner
            r = ((x + playerRadius) / cellWidth) >> 0, // Grab the right corner
            t = ((y - playerRadius) / cellHeight) >> 0, // Grab the top corner
            b = ((y + playerRadius) / cellHeight) >> 0, // Grab the bottom ccorner
            i = l,
            j = t;

        // Set the colour to a semi-transparent blue
        ctx.fillStyle = 'rgba(0, 0, 255, 0.05)';

        // Cycle between left-right and top-bottom, adding 1 for error correction
        for ( ; i < r + 1 ; ++i ) {

            for ( j = t ; j < b + 1 ; ++j ) {

                // Paint the square
                ctx.fillRect((i * cellWidth),
                             (j * cellHeight),
                             cellWidth,
                             cellHeight);

            }

        }

        // Set the colour to a dark red
        ctx.fillStyle = '#CC0000';

        // Draw the circle
        ctx.beginPath();
        ctx.arc(x, y, playerRadius, 0, 2 * Math.PI);
        ctx.fill();

    }

}());