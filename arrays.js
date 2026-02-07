let arr = [1,2,3,4,5];

// length
console.log(arr.length);

console.clear();

// at()
console.log(arr.at(2)); // 3

// concat()
console.log(arr.concat([6, 7])); 

// copyWithin()
let a1 = [1,2,3,4,5];
a1.copyWithin(0, 3);
console.log(a1);

// entries()
for (let e of arr.entries()) {
  console.log(e);
}

// every()
console.log(arr.every(n => n > 0)); // true

// fill()
let a2 = [1,2,3];
a2.fill(9);
console.log(a2);

// filter()
console.log(arr.filter(n => n > 3));

// find()
console.log(arr.find(n => n > 3));

// findIndex()
console.log(arr.findIndex(n => n === 4));

// findLast()
let a3 = [1,2,3,4,2];
console.log(a3.findLast(n => n === 2));

// findLastIndex()
console.log(a3.findLastIndex(n => n === 2));

// flat()
let a4 = [1,[2,[3]]];
console.log(a4.flat(2));

// flatMap()
console.log(arr.flatMap(n => [n, n * 2]));

// forEach()
arr.forEach(n => console.log(n));

// includes()
console.log(arr.includes(3));

// indexOf()
console.log(arr.indexOf(4));

// join()
console.log(arr.join("-"));

// keys()
for (let k of arr.keys()) {
  console.log(k);
}

// lastIndexOf()
console.log(a3.lastIndexOf(2));

// map()
console.log(arr.map(n => n * 10));

// pop()
let a5 = [...arr];
a5.pop();
console.log(a5);

// push()
a5.push(6);
console.log(a5);

// reduce()
console.log(arr.reduce((acc, n) => acc + n, 0));

// reduceRight()
console.log(["H","o","l","a"].reduceRight((acc, l) => acc + l));

// reverse()
let a6 = [...arr];
a6.reverse();
console.log(a6);

// shift()
let a7 = [...arr];
a7.shift();
console.log(a7);

// slice()
console.log(arr.slice(1,3));

// some()
console.log(arr.some(n => n > 4));

// sort()
let a8 = [5,3,1,4,2];
a8.sort((a,b) => a-b);
console.log(a8);

// splice()
let a9 = [1,2,3,4,5];
a9.splice(2,1,99);
console.log(a9);

// toLocaleString()
let prices = [1000, 2000];
console.log(prices.toLocaleString("es-CO"));

// toString()
console.log(arr.toString());

// unshift()
let a10 = [2,3,4];
a10.unshift(1);
console.log(a10);

// values()
for (let v of arr.values()) {
  console.log(v);
}
