const MESSAGE = "Hello World!";

document.querySelector("h1").innerText = MESSAGE;

console.log(MESSAGE);

const num1 = 10;
const num2 = 6;

const sumResult = num1 + num2;

const isNum = typeof sumResult === "number" && !isNaN(sumResult);

console.log(isNum ? "É um número" : "Não é um número");

const isString = typeof MESSAGE === "string";

console.log(isString ? "É uma string" : "Não é uma string");

const isBoolean = typeof isString === "boolean";

console.log(isString ? "É um booleano" : "Não é um booleano");

const diffResult = num1 - num2;

const mulResult = num1 * num2;

const divResult = num1 / num2;

const isOdd = sumResult % 2 === 0;

console.log(isOdd ? "É um número par" : "Não é um número par");

console.log(!isOdd ? "É um número ímpar" : "Não é um número ímpar");
