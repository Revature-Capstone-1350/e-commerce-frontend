# Quality Guidelines
The following is a comprehensive guide for maintaining a quality, robust, and *consistent* codebase. Many of these guides can transfer between the API and UI sides of the program, but any differences between the two will be separated as necessary. 

# Documentation
Documentation is an absolute must. Where possible, provide ample amounts of comments to help others understand how your code works. Although it may seem redundant, it's important to make things as clear and concise for people who may not be very familiar with the codebase.

## Documenting custom functions
When creating a function, the use of JSDoc is required to provide a summary of what the function does as well as what arguments are required.

When using JSDoc, the function summary should be informative but concise; the summary should also line up with the name of the function.

```ts
// example of bad jsdoc
/**
   * Checks if product is in cart.
   * If product is in cart, then it will add 1 to the quantity.
   * If product is not in cart, then it will add product to cart.
   * @param product product to be added to cart
   */
 const addItemToCart = (product: Product) => { // bad; the jsdoc written lines up more with a function called isInCart()
	 //...code
}
```
```ts
// example of good jsdoc
/**
   * Adds product to cart.
   * If product is in cart, then it will add 1 to the quantity.
   * If product is not in cart, then it will add product to cart.
   * @param product product to be added to cart
   */
  const addItemToCart = (product: Product) => {
	  //...code
}
```
JSDoc is only to be used with custom functions; use with React `useState()` will not be helpful. In this case, regular comments will suffice.

## Commenting code

Commenting code is not just useful; it is an absolute must. Thorough commenting allows clarity so people who may not know much (or anything) about the codebase. A comment should provide concise, informative, and detailed information about the code and what it does. 

A good rule of thumb is to comment every few lines. Again, although it may seem redundant, this clarity is required to ensure a deep understanding of how code works for yourself and others.

Use single-line comments where applicable; however, multi-line comments are beneficial where a large amount of comments in one place (such as directing people where to go  in code). 
```ts
const addSum = (...input:number[]) => {
    let sum:number = 0;
    for (let i of input) { // iterates through input
        sum += i; // adds the value of input to the sum
    }
    return sum; // returns the sum
}
```
## File and component names
Non-component filenames are to be `kebab-case` while component filenames are to be `PascalCase`.  

## Component creation
Component creation is to be done through arrow functions rather than traditional function declaration.
```ts
export const LoginForm = () => { // good
	// code ...
}
```
```ts
export const function LoginForm() { // bad
	// code ...
}
```
## Interfaces
Unlike interface naming conventions in Java, TypeScript interfaces are to be named similarly to C# naming conventions. They are to begin with `I`, followed by either a noun phrase (for example: `UserProps`) or an adjective (`Persistable`). The following is an example:
```ts
interface IUserProps {
	currentUser: User | undefined,
	setCurrentUser: (nextUser: User) => void
}
```
## Variables
Although any valid JavaScript code is valid TypeScript, not making use of typing should be avoided at all costs. Unless you simply do not *know* what type a variable might be, use strong typing.
```ts
let badUser:any = 'wsingleton'; // avoid at all costs
let goodUser:string = 'wsingleton'; // good example
```

Additionally, like JavaScript, use `let` to avoid any issues with scoping and hoisting. 

```ts
const run => () {
    var foo:string = "Foo";
    let bar:string = "Bar";

    console.log(foo, bar); // Foo Bar
    {
        var fizz:string = "Fizz"
        let buzz:string = "Buzz";
        console.log(fizz, buzz); // Fizz Buzz
    }

    console.log(fizz); // Fizz
    console.log(buzz); // ReferenceError
}

run();
```

## Various formatting conventions
Curly braces are to be same-line and tabs are to be four spaces per tab.

## Variable naming
Local variables are to be `camelCase` in almost all cases, with the exception of very common names (such as username and password). 
```ts
export const Example = () => {
	let badnumber:number = 15; // bad name
	let badNumber:number = 15; // good name
}
```
Static variables are to be written in `SCREAMING_SNAKE_CASE`. This does not apply to a static *reference*. 
```ts
class Universe {
	static MEANING_OF_LIFE: number = 42; 
}
console.log(Universe.MEANING_OF_LIFE); // 42
```
## Function declaration
Functions, like variables, are to be `camelCase`. 
```ts
class Example {
	static helloWorld(): void {
		console.log('Hello, world!');
	}
}
Example.helloWorld();
```
Like variable names, functions (and required arguments) should be named after what they do. Keep it as concise as reasonably possible while still relating to its job. (JSDoc has been omitted)
```ts
// good example
const addSum = (...input:number[]) => {
	// ...code
}
// bad example
const as = (...x:number[]) => {
	// ...code
}
```
## Conditional statements
Conditional statements, if single line and relatively simple, could be replaced with a ternary operator (though is not required). Ensure that the operator is separated by newlines and tabbed, to make readability easier.
```ts
let ternaryExample:string = (5 == 5) 
		? 'This statement is true'
		: 'Something has gone very wrong';
console.log(ternaryExample);
```
## Conclusion
This concludes quality conventions required for the final project. If you require any assistance, DM Richard for more information.
