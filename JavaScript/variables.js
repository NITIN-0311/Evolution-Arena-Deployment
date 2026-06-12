
/*
RULES FOR DEFINING VARIABLES

1.Can contains alphabets and numbers
2.Allowed special symbols _ and $
3.cannot start with digits
4.Camel case is preferred - firstName, accountBalance
*/


let age=20;
age=22;
const pi=3.14;
var $price=100
//pi=4; returns type error
//console.log(age,pi,$price);

/* 
DATATYPES - NOTES

1.NO Redeclaration but defining
2.Assigned inner function names are of type undefined
*/


let phoneNumber=6380337571;
let bigNumber=10n;

let priceValue=10.5;
//console.log(phoneNumber+bigNumber); throws type error

console.log(priceValue+phoneNumber);
console.log(BigInt(phoneNumber)+bigNumber);

let address;
console.log(address);

let siblings=null;
console.log(siblings);

let collegeSymbol=Symbol('pot');
let schoolSymbol=Symbol('pot')

console.log(collegeSymbol==schoolSymbol);

let intern={
    name:'nitin',
    isconverted:false,
    mentors:["John","Madhumitha","Surya","ArunJoseph"],
    age:21
}
console.log(intern)


let greetingFunction=function greet(name)
{
    console.log("Hello ",name);
}
console.log(typeof greet); //undefined
console.log(typeof greetingFunction);

let today= new Date();
console.log("year: ",today.getFullYear(),
"month: ",today.getMonth(),"date: ",today.getDate());

let x={name:"nitin"};
let y={name:"nitin"};
console.log(x==y) //different objects references(address) in the memory





