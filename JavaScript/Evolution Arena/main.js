const readline = require('node:readline');

const controlPanel= readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout,
    }
);

function read()
{
    //console.log("read function called");
    return new Promise((resolve)=>
        {
        input=controlPanel.question("",(input)=>{
        //controlPanel.close();
        return resolve(input);
    }
    );
        
    })
}

let playersData={
    players:new Map(),
    playersHp:[],
    count:0,
    addPlayer(playerID,playerName)
    {
        this.players.set(playerID,playerName);
    },
    listPlayers()
    {
        /*
        console.log(this.players);
        this.players.forEach( (playerID,index)=>
        {
            console.log(`Player ID - ${playerID} Player Name : ${this.players[playerID]}`)
        }
        );*/

        for([tempPlayerID,tempPlayerName] of this.players){
            console.log(`Player ID - ${tempPlayerID} Player Name : ${tempPlayerName}`);
        }
    }

};

let bot={
    hp:undefined,

    move()
    {
        moveNumber=Math.random%4;
    }
}

let moves={

    1:"attack",
    2:"heal",
    3:"defense",

    attack(){
        console.log("Player Attacked");
    },
    heal(){
        console.log("Player healed");
    },
    shield(){
        console.log("Player is blocking the attack");
    },
    menu()
    {
        console.log("1.Attack");
        console.log("2.Heal");
        console.log("3.Defense");
    }
}



async function runGame()
{
    let choice=-1;
    while(true)
    {
        moves.menu();

        let moveNumber = await read();
        move=moves[moveNumber];

        console.log("move", move);

        bot.move();
        
    }
};

async function choosePlayers()
{
    console.log("Choose player count");
    playersData.count=await read();

    for(let i=0;i<playersData.count;i++)
    {
        playerID=i+1;
        console.log(`Enter player ${playerID} name : `);
        let playerName=await read();
        playersData.addPlayer(playerID,playerName);
    }
    playersData.listPlayers();
}
async function startGame()
{
    console.log("Game has started");
    await choosePlayers();
    runGame();
}

startGame();

/*
Errors faced

1.Did'nt know how to read a input
2.Termimal is freezed because I was trying to
read input inside a loop which is synchronous
but readline is synchronous
3.Did'nt create read function as promise
4.
function read()
{
    console.log("read function called");
    return new Promise((resolve)=>
        {
        input=controlPanel.question("Choose your move");
        controlPanel.close();
        return resolve();
    })
}
*/