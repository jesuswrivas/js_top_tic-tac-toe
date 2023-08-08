
function Game() {

    function Player(name, mark){
        return {name, mark}
    }

    const player_1 = Player("jesus", "X")
    const player_2 = Player("walter", "O")


    function TicTacToeBoard(player_1, player_2) {

        const Board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
        let current_player = player_1;


        function CheckWin() {
            for (let player of ['X', 'O']) {
              if ((Board[0] == player && Board[1] == player && Board[2] == player) ||
                  (Board[0] == player && Board[3] == player && Board[6] == player) ||
                  (Board[0] == player && Board[4] == player && Board[8] == player) ||
                  (Board[1] == player && Board[4] == player && Board[7] == player) ||
                  (Board[2] == player && Board[5] == player && Board[8] == player) ||
                  (Board[2] == player && Board[4] == player && Board[6] == player) ||
                  (Board[3] == player && Board[4] == player && Board[5] == player) ||
                  (Board[6] == player && Board[7] == player && Board[8] == player)) {
                return true;
              }
            }
          
            return false;
        }

        function ValidMove(position) {
        if (Board[position - 1] == "-") {
            console.log(`${Board[position - 1]}`)
            return true;
        } else {
            return false;
        }
        }
          
                  

        function FinishTurn(){
            
            if (CheckWin()){
                console.log("Winner!")
                DisableSquares()
            } else{ 
                current_player = current_player == player_1 ? player_2 : player_1;
            }
        }

       
          
        //To be used with EnableSquares and DisableSquares
        function SquareOn(e){
          
            let squarePosition = e.target.id.split("_")[1]
            if (ValidMove(squarePosition)) {
                e.target.innerText = current_player.mark;
                Board[squarePosition - 1] = current_player.mark;
                FinishTurn();
                }
        }

    
         function EnableSquares(){
            squaresArray = document.querySelectorAll(".board-square-custom")

            squaresArray.forEach( (square) => {
                square.addEventListener("click", SquareOn)
            });

        }

        function DisableSquares(){
            squaresArray = document.querySelectorAll(".board-square-custom")
            squaresArray.forEach( (square) => {
                square.removeEventListener("click",SquareOn )
            });
        }



        return {Board}


    }

    newGame = TicTacToeBoard(player_1, player_2)
    newGame.EnableSquares()
   

    return {newGame}
    
}



newOne = Game()




