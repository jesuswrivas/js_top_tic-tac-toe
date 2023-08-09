
const Game = (() => {

    const Player = (name, mark)=> {

        return {name, mark}
    }


    const DisplayAux = (() => {

        const victoryModal = () => {
            let modal = document.querySelector("#victory-modal");
            modal.classList.toggle('custom-modal-show');
    
            let cancelButton = document.querySelector("#modal-cancel");
            cancelButton.addEventListener("click", () => {
                modal.classList.toggle('custom-modal-show');
            });
    
            let playButton = document.querySelector("#modal-play");
            playButton.addEventListener("click", () => {
                location.reload();
            });
        };
    
        const playModal = () => {
            let modal = document.querySelector("#new-game-modal");
            modal.classList.toggle('custom-modal__new-game-hide');
        };


        const setWinner = (player) =>{
            let winnerText = document.querySelector("#winner-text")
            winnerText.innerText = player + " " + "wins!"
        };

        const setDrawMessage = () =>{
            let drawText = document.querySelector("#winner-text")
            drawText.innerText = "Its a draw!"
        }
    
        return { victoryModal, playModal, setWinner, setDrawMessage };
    
    })();
    


    const TicTacToeBoard = (() => {

        const Board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
        let players = {player_1: "", player_2: ""}
        let current_player;

        const setCurrentPlayer = (player) => {
            current_player = player;
        };
    
        const getCurrentPlayer = () => {
            return current_player;
        };
    



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



        function CheckDraw(){
            if (CheckWin()){
                return false
            } else if (!Board.some( (square)=> square == "-" )) {
                return true
            }
        }



        function ValidMove(position) {
        if (Board[position - 1] == "-") {
            

            return true;
        } else {
            return false;
        }
        }
          
                  

        function FinishTurn(){
            

            if (CheckWin()){
                //Winning condition
                console.log("Winner!")
                DisableSquares()
                DisplayAux.setWinner(current_player.name)
                DisplayAux.victoryModal()
            
            }else if(CheckDraw()){
                console.log("Draw!")
                DisableSquares()
                DisplayAux.setDrawMessage()
                DisplayAux.victoryModal()

            } else{ 
                current_player = TicTacToeBoard.getCurrentPlayer() == players.player_1 ? players.player_2 : players.player_1;
                TicTacToeBoard.setCurrentPlayer(current_player); // 

            }
        }

       
          
        //To be used with EnableSquares and DisableSquares
        function SquareOn(e){
         

          
            let squarePosition = e.target.id.split("_")[1]
            let current_player = TicTacToeBoard.getCurrentPlayer()
          

            if (ValidMove(squarePosition)) {
                e.target.innerText = current_player.mark;
                Board[squarePosition - 1] = current_player.mark;
                FinishTurn();
                }
        }

    
         const EnableSquares = ()=>{
            let squaresArray = document.querySelectorAll(".board-square-custom")

            squaresArray.forEach( (square) => {
                square.addEventListener("click", SquareOn)
            });

        }

        function DisableSquares(){
            let squaresArray = document.querySelectorAll(".board-square-custom")
            squaresArray.forEach( (square) => {
                square.removeEventListener("click",SquareOn )
            });
        }
     

        return {Board, EnableSquares, getCurrentPlayer, setCurrentPlayer, players}

    
    })();

    const StartGame = ()=>{
        let player_1_name_input = document.querySelector("#player_1_name-input").value
        let player_2_name_input = document.querySelector("#player_2_name-input").value
        let player_1_name = document.querySelector("#player_1_name")
        let player_2_name = document.querySelector("#player_2_name")
        TicTacToeBoard.players.player_1 = Player(player_1_name_input, "X")
        TicTacToeBoard.players.player_2 = Player(player_2_name_input, "O")
        TicTacToeBoard.setCurrentPlayer(TicTacToeBoard.players.player_1)
    
     
       


        TicTacToeBoard.EnableSquares()
        DisplayAux.playModal()

        player_1_name.innerText = player_1_name_input
        player_2_name.innerText = player_2_name_input
    }

    
    let playButton = document.querySelector("#modal-start")
    playButton.addEventListener("click", StartGame)

})();











