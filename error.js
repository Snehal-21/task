// const message = {
//     name : "john",
//     greet : () => {
//         console.log("hey" + this.name + "how are you");
//     }
// }

// message.greet();


let patternToCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{7,12}$/;

let str = "abhishek@12";

console.log(patternToCheck.exec());




  