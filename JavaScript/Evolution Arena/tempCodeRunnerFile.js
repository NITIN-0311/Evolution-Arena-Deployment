const readline = require('node:readline');

const controlPanel= readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout,
    }
);

function read()
{
    input=controlPanel.question("Choose your move");
    controlPanel.close();
}


let player={
    hp:100
};

let bot={
    hp:100
}

let moves={

    attack(){
        console.log("Player Attacked");
    },
    heal(){
        console.log("Player healed");
    },
    shield(){
        console.log("Player is blocking the attack");
    }
}



async function runGame()
{
    let choice=-1;
    while(true)
    {
        await read();

    }
}

function startGame()
{
    console.log("Game has started");
    runGame();
}

startGame();