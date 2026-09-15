
//-------Game state------
let userseq=[];     //sequence of colors the users  has clicked this level
let gameseq=[];    // sequence of colors the computer has generated so far

let started=false;   // true once the game is in progress (blocks starting another)
let acceptingInput=false;// true only when players is allowed to click buttons

let level=0;

let color=['red','green','yellow','blue'];

// ------Timing constants (in ms)----
const Flash_duration=400;//how long a button stays visually 'lit'
const SEQUENCE_STEP_DELAY=600;//gap between each flash while replaying the sequence
const NEXT_LEVEL_DELAY=800;//pause after a correct round before the next level starts
const RESTART_COOLDOWN=800;//pause after the game over before a new game can be triggered
const GAMEOVER_FLASH_DURATION=200;//how long the red 'you lost ' background flash lasts


//--------DOM references------
let h4=document.querySelector('h4');
let h5=document.querySelector('h5');
let allbtn=document.querySelectorAll('.btn');



const High_Score_Key='highscorekey'

//start a game on the first click or keypress anywhere on the page
document.addEventListener('click',gameStart);  
document.addEventListener('keydown',gameStart);


for(btn of allbtn){
    btn.addEventListener('click',userClick)
}

showHighScore();

//------Game flow-----

/**
 * entry point trigrred only when click/keydown on the page.
 * only starts a new game if one isn't already running
 */

function gameStart(){
    if(!started){
        started=true;
        levelUp();
    }
}

/*
advances to the  new level and clear players progress with each level
and appends the new random color with computer sequence and replays
the full sequence from start. 
*/


function levelUp(){
    userseq=[];
    level++;

    h4.innerText=`level ${level}`;
    let idx=Math.floor(Math.random()*4);
    gameseq.push(`${color[idx]}`);
    
    playSequence();

}

/**
 * Briefly lights up a single button
 * 
 */

function btnFlash(btn){
    btn.classList.add('flash')
    setTimeout(()=>{
        btn.classList.remove('flash')
    },Flash_duration)
}


/**
 * Replays the whole sequence of the gameseq array in order, one flash at a time.
 * Input is locked (accepting=false) for the whole replay so
 * you can't click during replay and also only after sequence ends
 */

function playSequence(){
    acceptingInput=false;

    let i=0;
    let interval=setInterval(()=>{
      let btn=document.getElementById(gameseq[i]);
      btnFlash(btn);

      i++;

      if(i>=gameseq.length){
        clearInterval(interval);
        setTimeout(()=>{
            acceptingInput=true
        },SEQUENCE_STEP_DELAY)
      }

    },SEQUENCE_STEP_DELAY)
}


/**
 * handles a player clicking button 
 * ignored entriely when (acceptinginput=false) (i.e during computer's turn)
 * 
 */



function userClick(event){
    if (!acceptingInput) return;

    let btn=this;
    userseq.push(btn.id);
    btnFlash(btn);

    check(userseq.length-1);

}

/**
 * Briefly flashes the page background red to signal to wrong click
 */


function flashBackgroundRed(){
    document.querySelector('body').style.backgroundColor='red';
    setTimeout(()=>{
        document.querySelector('body').style.backgroundColor='white';
        
    },GAMEOVER_FLASH_DURATION)

}

/**
 * compares the players lastest click against the expected color at the same input
 * on mismatch end the game
 * on a fully-matched round lock the accpeting input and schedules the next level
 *  
 */


function check(idx){
    if(userseq[idx]!==gameseq[idx]){
        flashBackgroundRed();
        gameOver();
        return;
    }

    else if(userseq.length===gameseq.length){
        acceptingInput=false;
        setTimeout(levelUp,NEXT_LEVEL_DELAY);
    }
}

/**
 * Ends the current game : locks input immediately
 * records the highscore ,reset the game and shows the result 
 * a new game can't be started again until RESTART_COOLDOWN has passed
 */

function gameOver(){
    acceptingInput=false;

    let finalLevel=level-1;
    updateHighScore(finalLevel);

    h4.innerText=`Game over !! your finalLevel waas ${finalLevel} is `;

    resetState();

    setTimeout(()=>{
        started=false;
        h4.innerText=`press any key or click to start`;
    },RESTART_COOLDOWN)
 
}
/**
 * clears the sequence/level state between games
 */


function reset(){
    level=0;
    gameseq=[];
    userseq=[];
    
}


// ---------High score findings----
/**
 * compares the highscore and finallevel and 
 * sets the highscore with finallevel in case of higher value and the
 * pass it show
 * 
 */

function updateHighScore(finalLevel){
    let best=Number(localStorage.getItem(High_Score_Key)||0);
    if(finalLevel>best){
        localStorage.setItem(High_Score_Key,finalLevel)

    }
   showHighScore();
}


/**
 * show highscore
 * 
 */
function showHighScore(){
    let best=Number(localStorage.getItem(High_Score_Key)||0);
    h5.innerText=`your highest score is ${best}`;
}


