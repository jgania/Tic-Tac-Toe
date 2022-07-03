const p1 ='X';
const p2= 'O';
let winnersCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]


$(function() {
    let turn = 1; 
    let currentClass = 'X';
    let playing = true;
    let turns = 9;
    $('.block').on('click', function() {
        if ($(this).text() == '' && playing) { 
            if (turn == 1) {
                $(this).text('X').addClass('X');
                currentClass = 'X';
                $('.playerTurn').text('Currently O\'s Turn');
            } else {  
                $(this).text('O').addClass('O');
                currentClass = 'O'; 
                $('.playerTurn').text('Currently X\'s Turn');
            }
            turn *= -1
            turns--;

            if (checkWin(currentClass)) {
                $('.container').append('<div class="alert alert-primary mt-5">'+currentClass + ' wins the game<!/div>')
                playing = false;
            } 
            if (turns == 0 && playing) {
                $('.container').append('<div class="alert alert-danger mt-5">no one wins!</div>')
                playing = false;
            }
        }
    })

    function checkWin(currentClass) {
        return winnersCombos.some(combination => {
            return combination.every(index => {
                return $('.block')[index].classList.contains(currentClass)
            })
        })
    }

    $('.reset').on('click', function() {
        turn = 1; 
        currentClass = 'X';
        playing = true;
        turns = 9;
        $('.playerTurn').text('Currently X\'s Turn');
        $('.block').each(function() {
            $(this).removeClass('X').removeClass('O').text('');
        })
        $('.alert').remove();
    })
});