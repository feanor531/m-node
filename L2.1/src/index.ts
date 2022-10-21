// 1. 

function getFirstWord(a:String) {
	return a.split(/ +/)[0].length;
}

//console.log(getFirstWord("sdf sad"));

// 2. 

function getUserNamings(a:{name:String, surname:String}) {
    return { 
        fullname: a.name + " " + a.surname, 
        initials: a.name[0] + "." + a.surname[0] 
    };
}

//console.log(getUserNamings({name:"Artem", surname:"Styopin"}).initials);

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
type Product = {
    name?: String;
}
type Buy = {
    products: Array<Product>;
}

function getAllProductNames(a: Buy) {
    return a?.products?.map(prod => prod?.name) || [];
}

// let a: Product = {name: "suit"};
// let b: Product = {};
// let c: Product = {name: "pants"};
// let qw: Buy = {products:[]};
// qw.products.push(a);
// qw.products.push(b);
// qw.products.push(c); 
// console.log(getAllProductNames(qw));

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
type Person = {
    name(): String;
    cuteness?: number;
    coolness?: number;
}

function hey(a: Person) {
    return "hey! i'm " + a.name();
}
// console.log(hey({name: () => "roma", cuteness: 100}));
// console.log(hey({name: () => "vasya", coolness: 100}));

// 4.2

abstract class Animal {
    abstract name(): String;
}

class Cat extends Animal {
    constructor(public nickname: String, public wool: boolean) {
        super();        
    }
    
    name(): String {
        return this.nickname;
    }    
}

class Dog extends Animal {
    constructor(public nickname: String, public biteForce: number) {
        super();        
    }
    
    name(): String {
        return this.nickname;
    }    
}

function hey1(abstractPet: Animal) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
// console.log(hey1(a));
// console.log(hey1(b));

// 4.3
type Pet = {
    name(): String;
    type: String;
    cuteness?: number;
    coolness?: number;
}
function hey2(a: Pet) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
// console.log(hey2({name: () => "roma", type: "cat", cuteness: 100}));
// console.log(hey2({name: () => "vasya", type: "dog", coolness: 100}));

// 5.

// google for Record type

const associativeArray: Record<string, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
}

function stringEntries(a: Record<string, number>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// console.log(stringEntries(associativeArray));

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))