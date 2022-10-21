"use strict";
// 1. 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
//console.log(getFirstWord("sdf sad"));
// 2. 
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
function hey(a) {
    return "hey! i'm " + a.name();
}
// console.log(hey({name: () => "roma", cuteness: 100}));
// console.log(hey({name: () => "vasya", coolness: 100}));
// 4.2
class Animal {
}
class Cat extends Animal {
    constructor(nickname, wool) {
        super();
        this.nickname = nickname;
        this.wool = wool;
    }
    name() {
        return this.nickname;
    }
}
class Dog extends Animal {
    constructor(nickname, biteForce) {
        super();
        this.nickname = nickname;
        this.biteForce = biteForce;
    }
    name() {
        return this.nickname;
    }
}
function hey1(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
function hey2(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
// console.log(hey2({name: () => "roma", type: "cat", cuteness: 100}));
// console.log(hey2({name: () => "vasya", type: "dog", coolness: 100}));
// 5.
// google for Record type
const associativeArray = {
    "one": 1,
    "two": 2,
    "three": 3,
};
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
// console.log(stringEntries(associativeArray));
// 6.
// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it
function world(a) {
    return __awaiter(this, void 0, void 0, function* () {
        return "*".repeat(a);
    });
}
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield world(10);
});
hello().then(r => console.log(r)).catch(e => console.log("fail"));
