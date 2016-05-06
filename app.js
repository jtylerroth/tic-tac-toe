// (function () {

var winningCombos = [
    [1, 2, 3], //Top Horizontal
    [4, 5, 6], //Center Horizontal
    [7, 8, 9], //Bottom Horizontal
    [1, 4, 7], //Left Vertical
    [2, 5, 8], //Center Vertical
    [3, 6, 9], //Right Vertical
    [1, 5, 9], //Backslash Diagonal
    [3, 5, 7]  //ForwardSlash Diagonal
];

var current;
var x_spots;
var o_spots;
var gameOn;

function startGame(firstPlayer) {
    //Set blank game board
    current = {
        player: firstPlayer,
        turn: 1
    };
    x_spots = [];
    o_spots = [];
    gameOn = true;
    render();
    console.log('New match started. ' + firstPlayer + ' goes first.');

    while (gameOn) {
        console.log(current);
        console.log(x_spots);
        console.log(o_spots);
        takeTurn();
    }
}

function takeTurn() {
    if(current.turn == 10){
        gameOn = false;
        console.log('TIE');
        return;
    }
    if (current.player == 'x') {
        x_spots.push(x_botTurn());
    }
    else {
        o_spots.push(o_botTurn());
    }

    if (current.turn > 5) {
        if(checkForWin())
        {
            console.log(current.player + " wins!")
           gameOn = false;
        }
    }
    render();
    current.player = current.player == 'x' ? 'o' : 'x';
    current.turn++;
}

//Tyler
function x_botTurn() {
    // var random = getRandom();
    //
    // while (x_spots.indexOf(random) > -1 || o_spots.indexOf(random) > -1) {
    //     random = getRandom()
    // }


    // return random;
}
//Josh
function o_botTurn() {
    var random = getRandom();

    while (x_spots.indexOf(random) > -1 || o_spots.indexOf(random) > -1) {
        random = getRandom()
    }

    return random;
}

function checkForWin() {
    var checkSpots;
    if (current.player == 'x') {
        checkSpots = x_spots;
    }
    else {
        checkSpots = o_spots;
    }

   // [3,2, 4,1]
    //[1,2,3]
    //If win

    var matchedCount = 0;

    // console.info('CHECKING ' + current.player);
    console.log(checkSpots);
    winningLoop: for(var w = 0; w < winningCombos.length; w++)
    {
        matchedCount = 0;

        // console.info('Checking key ' + w);
        for(var c = 0; c < winningCombos[w].length; c++)
        {
            // console.info('Has ' + winningCombos[w][c] + '?');
            // console.log('pos: ' + checkSpots.indexOf(winningCombos[w][c]));
            if (checkSpots.indexOf(winningCombos[w][c]) > -1)
            {
                // console.log('yes');
                matchedCount++;

                if (matchedCount === 3)
                {
                    return true;
                }
            }
            else
            {
                // console.log('no');
            }

        }
    }

    return false;
}

function render() {
    //UI render here
}

function exists(num){
    return !!(o_spots.indexOf(num) > -1 || x_spots.indexOf(num) > -1);
}

function getRandom() {
    return Math.floor((Math.random() * 9) + 1);
}

startGame('x');
// });