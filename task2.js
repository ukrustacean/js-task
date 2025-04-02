// Task: write an auto-curry function.
// Example: f(a, b, c) == curry(f)(a)(b)(c)

const multiply = (a, b, c) => a * b * c;
const add = (a, b, c, d, e) => a + b + c + d + e;
const senseOfLife = () => 42;

const curry = (f) => {
    const args = []; // array for storing the function args
    const requiredArgs = f.length; // Function.length indicates the amount of the required function args

    // logic is dead simple: store an arguement and if the number of stored
    // arguements is more or equal to what is required, just execute a function 
    function helper(arg) {
        args.push(arg);

        return args.length >= requiredArgs ? f.apply(null, args) : helper
    }

    return helper
};

console.log(curry(senseOfLife)()) // bug or feature: function with no required arguments needs additional call to execute
console.log(curry(add)(1)(2)(3)(4)(5) == add(1, 2, 3, 4, 5)); // should be true
console.log(curry(multiply)(1)(2)(3) == multiply(1, 2, 3)); // should be true
