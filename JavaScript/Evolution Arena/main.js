const readline = require('node:readline');


const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const CYAN = "\x1b[36m";

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
    });
}

let gameFlag=true;

let moves={

    1:"attack",
    2:"heal",
    3:"defense",

    attack(playerID)
    {
        console.log(RED+"Player chose attack"+RESET);
            
        for(let i=0;i<=playersData.count;i++)
        {
            if(i!=playerID)
            {
                if(playersData.defenseFlag[i])
                {
                    console.log("Shield Broken for [",
                        playerID,"]",
                        playersData.players.get(i));

                    playersData.defenseFlag[i]=false;
                }
                else
                {
                    currentHp=playersData.playersHp.get(i);
                    playersData.playersHp.set(i,currentHp-25);
                }
                    
            }            
        }
    },
    heal(playerID){
        console.log(GREEN+`Player ${playerID} chose to Heal`+RESET);

        currentHp=(playersData.playersHp).get(playerID);
        playersData.playersHp.set(playerID,currentHp+10);

        if(playersData.playersHp.get(playerID)>100)
        {
            playersData.playersHp.set(playerID,100);
        }
        
        console.log("Player ID : ",playerID,
                    "Player Name : ",playersData.players.get(playerID),
                    "Player HP : ",playersData.playersHp.get(playerID)
                    );

    },

    shield(playerID)
    {
        playersData.defenseFlag[playerID]=true;
        console.log(CYAN+`${playersData.players.get(playerID)} is protected with shield`+RESET);
    },

    menu()
    {
        console.log("\n1.Attack");
        console.log("2.Heal");
        console.log("3.Defense");
        console.log("Choose your move");
    },

    makeMove(playerID,moveNumber)
    {
        switch (moveNumber){
            case 1:
                {
                    this.attack(playerID);
                    break;
                }
            case 2:
                {
                    this.heal(playerID);
                    break;
                }
            case 3:
                {
                    this.shield(playerID);
                    break;
                }
            default:
                console.log("Invalid move");
        }

    }
}

let playersData={
    players:new Map(),
    playersHp:new Map(),
    count:0,
    defenseFlag:[],
    isAlive:new Map(),
    
    addPlayer(playerID,playerName)
    {
        this.players.set(playerID,playerName);
        this.playersHp.set(playerID,100);
        this.isAlive.set(playerID,true);
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
    },

    hpStatus()
    {
        /*
        Map Elements cannot be accessed using index
        for(let i=0;i<playersData;i++)
        {
            if(playersData.playersHp!=0)
            {
                console.log(`Player ID :${playersData.players} Player Name ${} Player HP`);
            
            }
            
        }*/

        for([tempPlayerID,tempPlayerName] of this.players)
        {
            if(!playersData.isAlive.get(tempPlayerID));
                continue;
            console.log(`\nPlayer ID :${tempPlayerID}`);
            console.log(`Player Name ${tempPlayerName}`);
            console.log(`HP Status : ${this.playersHp.get(tempPlayerID)}`);
        }
    },

    checkAlive()
    {
        for(let playerId=0;playerId<=playersData.count;playerId++)
        {
            if(this.playersHp.get(playerId)<=0)
            {
                this.isAlive.set(playerId,false);
                console.log(`Player ${playersData.players.get(playerId)} is Elimintaed`);
                this.isOver();
            }
        }
    },
    isOver()
    {
        let NotEliminated=[];
        for(var i=0;i<=playersData.count;i++)
        {
            aliveFlag=this.isAlive.get(i);
            if(aliveFlag)
            {
                NotEliminated.push(i);
            }            
        }
        if(NotEliminated.length==1)
        {
            
            let winnerID=NotEliminated[0];
            console.log(`Winner - ${playersData.players.get(winnerID)}`)
            gameFlag=false;
        }
    }

};

let bot={
    hp:100,

    move()
    {
        moveNumber=Math.floor(Math.random()*3)+1;

        if(moveNumber==2 && playersData.playersHp.get(0)==100)
        {
            moveNumber=1;
        }
        else if(moveNumber==3 && playersData.defenseFlag[0]==true)
        {
            moveNumber=1;
        }

        switch(moveNumber)
        {
            case 1:
                {
                    moves.attack(0);
                    break
                }
            case 2:
                {
                    moves.heal(0);
                    break;
                }
            case 3:
                {
                    moves.shield(0);
                    break;
                }
            default:
                console.log("Bot chose a invalid move");
        }

    },
    initaliseBot()
    {
        playersData.addPlayer(0,"Bot");
    }
    
}

async function runGame()
{
    let choice=-1;
    console.log("Game started ");
    bot.initaliseBot();
    
    while(gameFlag)
    {
        for(let i=0;i<=playersData.count;i++)
        {
            if(!playersData.isAlive.get(i))
            {
                continue;
            }                
            console.log("==================================");
            console.log(RED+`\nPlayer - ${i} has to make a move`+RESET);
            moves.menu();
            //if (playersData.isAlive[i])
              //  continue

            if(i==0)
            {
                console.log("Bot made a move");
                bot.move();
            }                
            else
            {
                let moveNumber = await read();
                //move=moves[moveNumber];
                //console.log("Chosen move : ", move);
                moves.makeMove(i,Number(moveNumber));
            }
            console.log(YELLOW+"\nImpact on other Players");
            playersData.hpStatus();
            playersData.checkAlive();
            console.log(RESET);      
        }
    }
    console.log("Press any char to close the game");
    read();
    controlPanel.close();

};

async function choosePlayers()
{
    console.log("Choose player count : ");
    playersData.count=await read();
    
    for(let playerID=1;playerID<=playersData.count;playerID++)
    {
        console.log(`Enter player ${playerID} name : `);
        let playerName=await read();
        await playersData.addPlayer(playerID,playerName);
    }
    playersData.listPlayers();
}
async function startGame()
{
    console.log(RESET+"Game has started");
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
5.Wrote moves as different functions
6.Loops issues while map elements iterations
7.Missed to track the games modes
8.Everything inside the backtick is printed literally
the same
*/