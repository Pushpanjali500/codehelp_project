const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");
const tictac=document.querySelector(".tic-tac");
const resultText=document.querySelector("#result-text");

//initialize var
let currentPlayer;
let gameGrid;
const winningPosition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//lets create a function to initialize game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //ui pr empty
    boxes.forEach((box,idx)=>{
        box.innerText="";
        boxes[idx].style.pointerEvents="all";
        //initialize boxes with css properties
        box.classList=`box box${idx+1}`;
    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
initGame();
function swapTurn(){{
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X"
    }
    
    gameInfo.innerHTML=`Current Player-${currentPlayer}`
}}
function checkGameOver(){
    let ans="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[0]]!=="") && (gameGrid[position[0]]==gameGrid[position[1]]) && (gameGrid[position[1]]==gameGrid[position[2]]) ){
            //check if winner is X
            if(gameGrid[position[0]]==="X"){
                ans="X";
            }
            else{
                ans="0";
            }
            //disable pointer event
            boxes.forEach((box,idx)=>{
                box.style.pointerEvents="none";
            })
            //how we know x/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!=""){
       gameInfo.innerHTML=`Winner Player-${ans}`;
       newGamebtn.classList.add("active") 
       return;
    }
    //lets check when there is a tie
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillcount++;
        }
    });
    //board is filled game is tie
    if(fillcount==9){
        gameInfo.innerHTML="Game Tied !";
        newGamebtn.classList.add("active");
    }
}
function handleClick(idx){
     if(gameGrid[idx]===""){
        //ui update
        boxes[idx].innerHTML=currentPlayer;
        //inner logic
        gameGrid[idx]=currentPlayer;
        boxes[idx].style.pointerEvents="none"
        //swap kro turn ko
        swapTurn();
        //check for winning
        checkGameOver();
        newGamebtn.classList.add("active") 
     }
}
boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGamebtn.addEventListener("click",initGame);