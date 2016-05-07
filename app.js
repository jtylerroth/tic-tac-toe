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

var winnings = { x: [], o: [] };

function startGame(firstPlayer, table) {
    //Set blank game board
    current = {
	    started: firstPlayer,
        player: firstPlayer,
        turn: 1,
	    table: table
    };

	table.find('.first-player').text(firstPlayer.toUpperCase());

    x_spots = [];
    o_spots = [];
    gameOn = true;
    console.log('New match started. ' + firstPlayer + ' goes first.');

    while (gameOn) {
        takeTurn();
    }
}

function takeTurn() {
    if(current.turn == 10){
        gameOn = false;
        console.log('TIE');
        return;
    }

	var spot = 0;
    if (current.player == 'x')
    {
	    spot = x_botTurn();
        x_spots.push(spot);
    }
    else
    {
	    spot = o_botTurn();
        o_spots.push(spot);
    }

	//console.log(spot + ': ' + current.player.toUpperCase());
	current.table.find('.board-' + spot).text(current.player.toUpperCase());

    if (current.turn > 5)
    {
	    var won = checkForWin();
        if(won)
        {
	        for(var w = 0; w < won.length; w++)
	        {
		        current.table.find('.board-' + won[w]).addClass('winning');
	        }
           gameOn = false;

	        var winner = current.player;
	        winnings[winner].push(current.started);
        }
    }

    current.player = current.player == 'x' ? 'o' : 'x';
    current.turn++;
}

//Tyler
function x_botTurn() {
    var random = getRandom();

    while (x_spots.indexOf(random) > -1 || o_spots.indexOf(random) > -1) {
         random = getRandom()
    }


    return random;
}


//Josh
function o_botTurn()
{

	/*
		Ref:
		1  |  2  |  3
		4  |  5  |  6
		7  |  8  |  9
	 */

	
	var random = getRandom();

	while (exists(random))
	{
        random = getRandom();
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
                    return winningCombos[w];
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

function exists(num){
    return !!(o_spots.indexOf(num) > -1 || x_spots.indexOf(num) > -1);
}

function getRandom() {
    return Math.floor((Math.random() * 9) + 1);
}


$(document).ready(function()
{
	var container = $('#tables');
	var tableCount = parseInt(container.data('generate'));

	for(var t = 1; t <= tableCount; t++)
	{
		var table = $('<table>');
		var cellCount = 1;

		table.append('<tr><td colspan="3" class="first-player"></td>');

		for (var trc = 1; trc <= 3; trc++)
		{
			var tr = $('<tr>');
			for (var tdc = 1; tdc <= 3; tdc++)
			{
				tr.append('<td class="board-' + cellCount++ + '">');
			}
			table.append(tr);
		}
		container.append(table);
	}

	var lastPlayer = 'x';
	container.find('table').each(function()
	{
		var player = (lastPlayer === 'x') ? 'o' : 'x';
		lastPlayer = player;
		startGame(player, $(this));
	});

	// Show winnings
	var xWins = winnings.x.length;
	var oWins = winnings.o.length;

	if (xWins > oWins)
	{
		$('#wins .player-x').addClass('winner');
	}
	else if (xWins < oWins)
	{
		$('#wins .player-o').addClass('winner');
	}

	$('#wins .player-x td:last').text(xWins);
	$('#wins .player-o td:last').text(oWins);

	var xWinsOStarted = 0;
	var xWinsXStarted = 0;
	var oWinsXStarted = 0;
	var oWinsOStarted = 0;

	for(var x = 0; x < winnings.x.length; x++)
	{
		if (winnings.x[x] === 'x')
		{
			xWinsXStarted++
		}
		else
		{
			xWinsOStarted++;
		}
	}

	for(var o = 0; o < winnings.o.length; o++)
	{
		if (winnings.o[o] === 'x')
		{
			oWinsXStarted++
		}
		else
		{
			oWinsOStarted++;
		}
	}

	$('#wins .player-x td:eq(1)').text(xWinsXStarted);
	$('#wins .player-x td:eq(2)').text(xWinsOStarted);

	$('#wins .player-o td:eq(1)').text(oWinsXStarted);
	$('#wins .player-o td:eq(2)').text(oWinsOStarted);




});
