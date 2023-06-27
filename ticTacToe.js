var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ]

    for(let r = 0; r < 3; r++){
        for( let c = 0; c < 3; c++){
            // <div><div/>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        } 
    }
}

function setTile() {
    if (gameOver){
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' '){
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    if (currPlayer == playerO){
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }
    
    checkWinner();
}

function checkWinner() {
    for (let i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ' '){
            for ( let j = 0; j < 3; j++){
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //check vertically
    for (let j = 0; j < 3; j++){
        if(board[0][j] == board[1][j] && board[1][j] == board[2][j] && board[0][j] != ' '){
            for ( let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //check diagonally left to right
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for ( let i = 0; i < 3; i++){
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
    
    // check diagonally right to left
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        tile = document.getElementById("2-0");
        tile.classList.add("winner");

        gameOver = true;
        return;
    }
}