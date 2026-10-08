console.log("Hello, World!");

//Data Types
/** 
 * Number: Represents numeric values, both integers and floating-point numbers.
 * String: Represents sequences of characters, used for text.
 * Boolean: Represents true or false values.
 * Array: Represents a collection of values of the same type.
 * Tuple: Represents a fixed-size collection of values of different types.
 * Object: Represents a collection of key-value pairs, where keys are strings and values can be of any type.
*/
let age: number = 25;
let name: string = "John";
let isStudent: boolean = true;

//cannot do:
// age = "25"; // Error: Type 'string' is not assignable to type 'number'

let numbers: number[] = [1, 2, 3, 4, 5];
//Another way to declare an array
let arr: Array<string> = ["apple", "banana", "cherry"];
 
let person: [string, number] = ["Alice", 30];
let user: { name: string; age: number } = { name: "Bob", age: 35 };

//Any and Unknown Types
/** 
 * Any: Represents any value and allows for dynamic typing. It can be assigned to any type without type checking.
 * Unknown: Represents a value of unknown type. It requires type checking or type assertions before using it.
*/
let a:any = 10;
a = "Hello";
a = true;

let b:unknown = 20;

if(typeof b === "number")
    console.log(b.toFixed(2)); // Now we can safely use b as a number

// console.log(b.toFixed(2)); // cannot do this because b is of unknown type and we need to check its type before using it


//Void and Never Types
/** 
 * Void: Represents the absence of a value or return type. It is commonly used for functions that do not return anything.
 * Never: Represents values that never occur. It is used for functions that throw exceptions or have infinite loops.
*/
function logMessage(message: string): void {
    console.log(message);
}

function throwError(message: string): never {
    throw new Error(message); //Never returns a value, it throws an error instead
}