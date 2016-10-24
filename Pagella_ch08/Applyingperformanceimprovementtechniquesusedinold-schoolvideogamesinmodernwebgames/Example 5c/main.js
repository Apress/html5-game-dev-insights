;(function() {

    var fps = 30, // Define the maximum number of FPS
        interval = 1000 / fps, // Calculate the interval in milliseconds
        delta = 0, // Variable initialisation
        previousTs = 0; // Variable initialisation
        shouldRepaint = true, // Set the repaint flag to true by default
        Grid = [], // Initialize an array where we're going to be storing the grid values
        gridCols = 1000000, // Setup the number of columns of the grid
        gridRows = 1000000, // Setup the number of rows of the grid
        viewportWidth = 640, // Setup the width of the viewport (the canvas)
        viewportHeight = 480, // Setup the height of the viewport (the canvas)
        cellWidth = 60,
        cellHeight = 30,
        scrollX = 0, // Offset in the X axis
        scrollY = 0, // Offset in the Y axis
        canvas = document.querySelector('canvas'), // Grab a reference to the canvas object...
        ctx = canvas.getContext('2d'), // ...and its context
        i = 0, // Declare counters for the for loop we'll be using below
        j = 0; // Declare counters for the for loop we'll be using below

    // Set the size of the canvas
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Listen for keypresses
    window.addEventListener('keydown', function(e) {

        switch (e.keyCode) {
            case 37: // Left
            case 65: // A

                // Make sure that we can't scroll past our minimum value (0)
                if (scrollX > 0) {
                    scrollX -= 10;
                }

                break;
            case 39: // Right
            case 68: // D

                // Make sure that we can't scroll past our maximum value
                // (Width of the Cell * Number of Columns)
                if (scrollX < (cellWidth * gridCols)) {
                    scrollX += 10;
                }

                break;
            case 38: // Up
            case 87: // W

                // Make sure that we can't scroll past our minimum value (0)
                if (scrollY > 0) {
                    scrollY -= 10;
                }

                break;
            case 40: // Down
            case 83: // S

                // Make sure that we can't scroll past our maximum value
                // (Height of the Cell * Number of Rows)
                if (scrollX < (cellHeight * gridRows)) {
                    scrollY += 10;
                }

                break;
        }

        // Set those cells as "modified", therefore we need to redraw them
        var i = (scrollY / cellHeight) >> 0,
            j = (scrollX / cellWidth) >> 0,
            lastRow = ((canvas.height + scrollY) / cellHeight) >> 0, // Grab the last row
            lastCol = ((canvas.width + scrollX) / cellWidth) >> 0; // Grab the last column

        // console.time("Grid Rendering");
        for ( ; i < lastRow ; ++i ) {

            for ( j = ((scrollX / cellWidth) >> 0) ; j < lastCol ; ++j ) {

                // Handle the initialisation of new cells, in case they are not created
                if (Grid[i] === undefined) {

                    // Has the row been declared?
                    Grid[i] = [];

                }

                Grid[i][j] = 1;

            }

        }

        shouldRepaint = true;

    }, false);

    // Call the update loop for the first time
    requestAnimationFrame(update);

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

            // Paint the "background"
            var i = (scrollY / cellHeight) >> 0,
                j = (scrollX / cellWidth) >> 0,
                lastRow = ((canvas.height + scrollY) / cellHeight) >> 0, // Grab the last row
                lastCol = ((canvas.width + scrollX) / cellWidth) >> 0; // Grab the last column

            console.time("Grid Rendering");
            for ( ; i < lastRow ; ++i ) {

                for ( j = ((scrollX / cellWidth) >> 0) ; j < lastCol ; ++j ) {

                    // Handle the initialisation of new cells, in case they are not created
                    if (Grid[i] === undefined) {

                        // Has the row been declared?
                        Grid[i] = [];

                    }

                    // Has the column been declared?
                    if (Grid[i][j] === undefined) {

                        // Flag all the cells as "modified" by default
                        Grid[i][j] = 1;

                    }

                    if (Grid[i][j] === 1) {

                            paintCell(ctx,
                                      (j * cellWidth) - scrollX,
                                      (i * cellHeight) - scrollY,
                                      cellWidth,
                                      cellHeight);

                            // Print the current values of i and j for each cell
                            ctx.fillStyle = '#000';
                            ctx.font = '10px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText(i + ' ' + j,
                                         (j * cellWidth) - scrollX,
                                         (i * cellHeight) - scrollY);

                            // Set that position as painted
                            Grid[i][j] = 0;

                    }

                }

            }
            console.timeEnd("Grid Rendering");

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

        // Set the background colour to white
        ctx.fillStyle = '#fff';

        // Draw the background
        ctx.fillRect(x, y, w, h);

        // Set the border colour to gray
        ctx.strokeStyle = '#ccc';

        // Draw an outline
        ctx.strokeRect(x, y, w, h);

    }

}());