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
    });
}

let moves={

    1:"attack",
    2:"heal",
    3:"defense",

    attack(playerID)
    {
        for(let i=0;i<playersData.count;i++)
        {
            console.log("move", move);
            if(playersHp[i]!=playerID)
            {
                if(playersData.defenseFlag[i])
                {
                    console.log("Shield Broken : ",
                        playerID,
                        playersData.players[i]);

                    playersData.defenseFlag[i]=false;
                }
                else
                    playersData.playersHp[i] -=10;
            }            
        }
    },

    heal(playerID){
        playersData.playersHp[playerID]+=10;

        if(playersData.playersHp[playerID]>100)
        {
            playersData.playersHp[playerID]=100;
        }
        
        console.log("Player ID : ",playerID,
                    "Player Name : ",playersData.playerName[playerID],
                    "Player HP : ",playersData.playersHp[playerID]
                   );

    },

    shield(playerID)
    {
        playersData.defenseFlag[playerID]=true;
        console.log(`${this.playerName[playerID]} is protected with shield`);
    },

    menu()
    {
        console.log("1.Attack");
        console.log("2.Heal");
        console.log("3.Defense");
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
        this.isAlive[playerID]=true;
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

    setupBot()
    {

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
            console.log(`
                Player ID :${tempPlayerID} 
                Player Name ${tempPlayerName}
                HP Status : ${this.playersHp[tempPlayerID]}`);
        }
    },

    checkAlive()
    {
        for(let playerId=0;playerId<playersData.count;playerId++)
        {
            if(this.playersHp[playerId]<=0)
            {
                this.isAlive[playerId]=false;
                console.log(`Player ${playersData.playerName[playerId]} is OUT`);
            }
        }
    },

};

let bot={
    hp:undefined,

    move()
    {
        moveNumber=Math.random%4;

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
        }

    },
    
}

async function runGame()
{
    let choice=-1;
    
    while(true)
    {
        for(let i=0;i<playersData.count;i++)
        {
     
            moves.menu();
            //if (playersData.isAlive[i])
              //  continue

            if(i==0)
            {
                bot.move();
            }                
            else
            {
                let moveNumber = await read();
                //move=moves[moveNumber];
                //console.log("Chosen move : ", move);
                makeMove(move,i);
            }
            playersData.hpStatus();
            playersData.checkAlive();
            
        }
    }
};

async function choosePlayers()
{
    console.log("Choose player count : ");
    playersData.count=await read();
    
    for(let i=0;i<playersData.count;i++)
    {
        playerID=i+1;
        console.log(`Enter player ${playerID} name : `);
        let playerName=await read();
        await playersData.addPlayer(playerID,playerName);
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
5.Wrote moves as different functions
6.Loops issues while map elements iterations
7.Missed to track the games modes
*/