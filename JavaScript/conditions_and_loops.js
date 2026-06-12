let day = 6;

switch (true) {
  case day == 6 || day == 7:
    console.log("weekeend");
    break;
  case day >= 1 && day < 6:
    console.log("Weekday");
    break;

  default:
    console.log("invalid day");
}

switch (day) {
  case 6:
    console.log("Weekend");
    break;
  case 7:
    console.log("weekend");
    break;
  default:
    console.log("weekday or invalid day");
}

for (let i = 0; i < 5; i++) {
  let j = i;
  while (j < 5) {
    //process.stdout.write("*");
    //console.log("*");
    j++;
  }
  //console.log("\n")
}
/*
0(n)
   *
  ***
 *****
********
*/
for (let i = 0; i < 5; i++) {
  let j = i;
  while (j < 5) {
    //process.stdout.write("*");
    //console.log("*");
    j++;
  }
  //console.log("\n");
}

console.log("\nFOR LOOPS\n");

let colors = ["blue", "green", "red"];

for (var color of colors) {
  console.log(color);
}

let student = { name: "nitin", age: 21 };

for (const key in student) {
  console.log(student[key]);
}

//console.error("error");
//console.warn("warning");
console.table(["row1", "row2"]);

//const respone = prompt("Enter name: ");
console.log("Hello ", respone);
