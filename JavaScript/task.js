function server1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Server 1 task");
            reject();
        }, 2000);
    });
}

function server2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Server 2 task");
            resolve();
        }, 5000);
    });
}

server1().then(() => server2())
    .then(() => {
        console.log("Done");
    }).catch(error=>{console.log("error handled")});
    