const QTY_OF_NUMS = 2;

const OPERATIONS = [
  {
    name: "Soma",
    message: "O resultado da soma é %replace%",
    operation: (a, b) => a + b,
  },
  {
    name: "Subtração",
    message: "O resultado da subtração é %replace%",
    operation: (a, b) => a - b,
  },
  {
    name: "Multiplicação",
    message: "O resultado da multiplicação é %replace%",
    operation: (a, b) => a * b,
  },
  {
    name: "Divisão",
    message: "O resultado da divisão é %replace%",
    operation: (a, b) => a / b,
  },
  {
    name: "Resto da divisão",
    message: "O resultado do resto da divisão é %replace%",
    operation: (a, b) => a % b,
  },
  {
    name: "Checar se os números são iguais",
    message: "Os números %replace%são iguais",
    operation: (a, b) => (a === b ? "" : "não "),
  },
  {
    name: "Checar se a soma dos números é um valor ímpar",
    message: "A soma dos números %replace%",
    operation: (a, b) => ((a + b) % 2 === 0 ? "par" : "ímpar"),
  },
];

const numbers = new Array(QTY_OF_NUMS);

for (const [i] of numbers.entries()) {
  let input = prompt(i === 0 ? "Digite um número" : "Digite outro número");

  if (isNaN(input)) {
    alert("Deve ser um número");

    break;
  }

  numbers[i] = Number(input);
}

for (const { message, operation } of OPERATIONS) {
  const result = operation(numbers[0], numbers[1]);

  alert(
    message.replace(
      "%replace%",
      typeof result === "number" && result % 1 !== 0
        ? result.toFixed(2)
        : result
    )
  );
}
