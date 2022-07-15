// function sum () {
//     let sum = 0;

//     for (let i = 0; i < arguments.length; i++) {
//         sum += arguments[i];
//     }
//     return sum;
// }


function sum () {
    return [...arguments].reduce(function (acc, val) {
        return acc + val;
    })
}
// [...arguments] turns the arguments object into a real array
// console.log(sum(1, 2, 3, 4)) // === 10;
// console.log(sum(1, 2, 3, 4, 5)) // === 15;


// Function.prototype.myBind = function(ctx) {
//     // arguments[0] === context
//     let that = this;
//     let argsArray = [];
//     for (let i = 1; i < arguments.length; i++) {
//         argsArray.push(arguments[i]);
//     }

//     return function() {
//         for (let i = 0; i < arguments.length; i++) {
//             argsArray.push(arguments[i]);
//         }
//         return that.apply(ctx, argsArray);
//     }
// }


Function.prototype.myBind = function(ctx) {
    let that = this;
    let argsArray = [...arguments].slice(1);

    return function() {
        argsArray = argsArray.concat([...arguments]);
        
        return that.apply(ctx, argsArray);
    }
}


class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true



// function curriedSum(numArgs) {
//     const numbers = [];
    
//     return function _curriedSum(num) {
//         numbers.push(num);

//         if (numbers.length === numArgs) {
//             return numbers.reduce(function(acc, ele) {
//                 return acc + ele;
//             });
//         } else {
//             return _curriedSum;
//         }
//     }
// }

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56



// Function.prototype.curry = function(numArgs) {
//     let that = this; // this is the function you are calling .curry on
//     const argsArray = [];
    
//     return function _curry(arg) {
//         argsArray.push(arg);

//         if (argsArray.length === numArgs) {
//             return that.apply(that, argsArray);
//         } else {
//             return _curry;
//         }
//     }
// }


Function.prototype.curry = function(numArgs) {
    let that = this.bind(this); // this is the function you are calling .curry on
    const argsArray = [];
    
    return function _curry(arg) {
        argsArray.push(arg);

        if (argsArray.length === numArgs) {
            return that(...args);
        } else {
            return _curry;
        }
    }
}
// ... just splats an array => It will give each argument one at a time to that