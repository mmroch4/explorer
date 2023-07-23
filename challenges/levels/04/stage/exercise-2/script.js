const MIN_MARKS_AVERAGE = 70;

// Scale 0%-100%
const students = [
  {
    name: "Miguel Rocha",
    tests: [
      {
        title: "B2 First for Schools",
        mark: 92,
      },
      {
        title: "Prova de Matemática A",
        mark: 87,
      },
      {
        title: "Prova de Filosofia",
        mark: 83,
      },
    ],
  },
  {
    name: "Mayk Brito",
    tests: [
      {
        title: "B2 First for Schools",
        mark: 86,
      },
      {
        title: "Prova de Matemática A",
        mark: 89,
      },
      {
        title: "Prova de Filosofia",
        mark: 96,
      },
    ],
  },
  {
    name: "Diego Fernandes",
    tests: [
      {
        title: "B2 First for Schools",
        mark: 88,
      },
      {
        title: "Prova de Matemática A",
        mark: 82,
      },
      {
        title: "Prova de Filosofia",
        mark: 79,
      },
    ],
  },
];

for (const student of students) {
  const marksAverage =
    student.tests.reduce((total, test) => total + test.mark, 0) /
    student.tests.length;

  if (marksAverage >= MIN_MARKS_AVERAGE) {
    alert(
      alertTemplate(
        student.name,
        marksAverage,
        `Parabéns ${student.name}, você foi aprovado(a)!`
      )
    );
  } else {
    alert(
      alertTemplate(
        student.name,
        marksAverage,
        `Infelizmente, ${student.name}, você não foi aprovado(a)!`
      )
    );
  }
}

function alertTemplate(name, marksAverage, message) {
  return `A média do(a) aluno(a) ${name} é: ${
    marksAverage % 1 === 0 ? marksAverage : marksAverage.toFixed(2)
  }% \n${message}`;
}
