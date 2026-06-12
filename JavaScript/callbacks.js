function welcome(callback_function){
    callback_function();
    console.log("welcome to ngp")
}

function greet(){
    console.log("good morning everyone");
}
welcome(greet); //great is a function name (callback)


// --//


function teacherReceived(marks){
    console.log("Teacher Received");
}
function studentreceived(marks){
    console.log("Student received");
}

function calculateMarks(marks,callback_function){
    total=0;
    for (var mark of marks){
        total+=mark
    }
    callback_function();
}

calculateMarks([100,80,90],teacherReceived);
calculateMarks([100,80,90],studentreceived);


function async_tasks(subtask)
{
    setTimeout(()=>{
        console.log("Task A");
    },3000);

    setTimeout(()=>{
        console.log("Task B");
    },1000);

    setTimeout(()=>{
        console.log("Task C");
    },1500);
}
async_tasks();


function calculate(a, b, operation) {
    operation(a, b);
}

calculate(10, 5, (x, y) => console.log(x + y));
calculate(10, 5, (x, y) => console.log(x - y));
calculate(10, 5, (x, y) => console.log(x * y));


function server()
{
    response=null;
    setTimeout(
        ()=>{
            console.log("Fetching data from db");
            respone="nitin";
        }
        
    ,10000)
    return response;
}



function fetchData()
{
    const response = server();
    console.log("respone from server : ",response);
}

fetchData();

/*
settime()
function server(callback)
{
    setTimeout(() => {

        console.log("Fetching data from db");

        const response = {
            id: 1,
            name: "Nitin"
        };

        callback(response);

    }, 10000);
}

function fetchData()
{
    server((response) => {
        console.log("Response from server:", response);
    });
}

fetchData();
*/