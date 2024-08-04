const boxes = [...document.querySelectorAll(".box")];
const message = document.querySelector("#message");
const restart = document.querySelector("#reset");
const playerOne = document.querySelector("#player--one");
const playerTwo = document.querySelector("#player--two");

// the starting state 
let player = 'X';
playerOne.style.transform = 'scale(1.2)';
let gameOver = false;

//Now we are going to make the array of winning conditions --- we have 8 winning conditions
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//Next we are adding an event listener to each boxDecorationBreak: 
boxes.forEach((box)=>{
    box.addEventListener("click", boxClicked);
})

// and an event listener for the reset button
restart.addEventListener("click", resetBoard);

//boxClicked function
function boxClicked (e) {
    const box = e.target;
    if (box.innerHTML !== "" || gameOver){
        return;
    }
    box.innerHTML= player;
    if (player === 'X'){
        player = 'O';
        box.style.backgroundColor = 'blue';
        box.style.boxShadow = '0px 0px 10px 3px rgb(45, 62, 214)'
        box.style.border = '1px solid rgb(45, 62, 214)' 
        playerOne.style.transform = 'scale(1)'
        playerTwo.style.transform = 'scale(1.2)'
    } else {
        player = 'X';
        box.style.backgroundColor = 'red';
        box.style.boxShadow = '0px 0px 10px 3px rgb(214, 45, 45)'
        box.style.border = '1px solid rgb(214, 45, 45)' 
        playerOne.style.transform = 'scale(1.2)'
        playerTwo.style.transform = 'scale(1)'
    }
    //we will check the winning condition by looping over the array
    checkWin();
}

//check for win function
function checkWin() { 
    let roundWon = false;
    for ( let i =0; i< winningConditions.length; i++){
        const condition = winningConditions[i];
        const boxA = boxes[condition[0]];
        const boxB = boxes[condition[1]];
        const boxC = boxes[condition[2]];
        if(
            boxA.innerHTML === boxB.innerHTML && 
            boxB.innerHTML === boxC.innerHTML &&
            boxA.innerHTML !== ''
        ){
            roundWon = true;
            //highlight the winning boxes
            boxA.style.backgroundColor = 'green';
            boxB.style.backgroundColor = 'green';
            boxC.style.backgroundColor = 'green';
            boxA.style.boxShadow = '0px 0px 10px 3px green'
            boxB.style.boxShadow = '0px 0px 10px 3px green'
            boxC.style.boxShadow = '0px 0px 10px 3px green'
            boxA.style.border = '1px solid green' 
            boxB.style.border = '1px solid green' 
            boxC.style.border = '1px solid green' 
            break;
        }
    }
    if (roundWon){
        if (player === 'X'){
            // will increase the score of O
            const scoreOne = parseInt(document.getElementById("score--two").innerHTML);
            document.getElementById("score--two").innerHTML= scoreOne + 1;
            message.innerHTML = ' Player O Won!';
            message.style.color = 'red';
        } else{
            // will increase the score of X
            const scoreOne = parseInt(document.getElementById("score--one").innerHTML);
            document.getElementById("score--one").innerHTML= scoreOne + 1;
            message.innerHTML = ' Player X Won!';
            message.style.color = 'blue';
        }
        gameOver = true;
        //clear the message after 3 seconds
        setTimeout(()=> {
            message.innerHTML= '';
        }, 3000);   
    } else if ( boxes.every(box => box.innerHTML !== '')){
        message.innerHTML = 'Draw!';
        message.style.color = 'yellow';
        gameOver = 'true';
        //clear the message after 3 seconds
        setTimeout(()=> {
            message.innerHTML= '';
        }, 3000);  
    }
}

// Reset the Board
function resetBoard () {
    boxes.forEach((box)=> (
        box.innerHTML = ''
        // reset the backgroundColor
        ,box.style.backgroundColor = ' transparent'
        //reset the border and the shadow
        , box.style.boxShadow = ' 0px 0px 10px 3px rgba(214, 45, 93, 1)'
        , box.style.border = '1px solid #ce5f5f'
        // reset the player
        , playerOne.style.transform = 'scale(1.2)'
        , playerTwo.style.transform = 'scale(1)'
    ));
    player = 'X';
    gameOver = false;
}