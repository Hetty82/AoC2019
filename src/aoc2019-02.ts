import { range } from "./helpers";

// Once you have a working computer, the first step is to restore the gravity assist program
// (your puzzle input) to the "1202 program alarm" state it had just before the last computer
// caught fire. To do this, before running the program, replace position 1 with the value 12
// and replace position 2 with the value 2. What value is left at position 0 after the program
// halts?

const input = [
  1,
  0, // replace with 12
  0, // replace with 2
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  6,
  19,
  1,
  5,
  19,
  23,
  1,
  23,
  6,
  27,
  1,
  5,
  27,
  31,
  1,
  31,
  6,
  35,
  1,
  9,
  35,
  39,
  2,
  10,
  39,
  43,
  1,
  43,
  6,
  47,
  2,
  6,
  47,
  51,
  1,
  5,
  51,
  55,
  1,
  55,
  13,
  59,
  1,
  59,
  10,
  63,
  2,
  10,
  63,
  67,
  1,
  9,
  67,
  71,
  2,
  6,
  71,
  75,
  1,
  5,
  75,
  79,
  2,
  79,
  13,
  83,
  1,
  83,
  5,
  87,
  1,
  87,
  9,
  91,
  1,
  5,
  91,
  95,
  1,
  5,
  95,
  99,
  1,
  99,
  13,
  103,
  1,
  10,
  103,
  107,
  1,
  107,
  9,
  111,
  1,
  6,
  111,
  115,
  2,
  115,
  13,
  119,
  1,
  10,
  119,
  123,
  2,
  123,
  6,
  127,
  1,
  5,
  127,
  131,
  1,
  5,
  131,
  135,
  1,
  135,
  6,
  139,
  2,
  139,
  10,
  143,
  2,
  143,
  9,
  147,
  1,
  147,
  6,
  151,
  1,
  151,
  13,
  155,
  2,
  155,
  9,
  159,
  1,
  6,
  159,
  163,
  1,
  5,
  163,
  167,
  1,
  5,
  167,
  171,
  1,
  10,
  171,
  175,
  1,
  13,
  175,
  179,
  1,
  179,
  2,
  183,
  1,
  9,
  183,
  0,
  99,
  2,
  14,
  0,
  0
];

// const restore = (program: number[]) => {
//   const restored = [...program];
//   restored[1] = 12;
//   restored[2] = 2;
//   return restored;
// };

const replaceNounAndVerb = (program: number[], noun: number, verb: number) => {
  const updated = [...program];
  updated[1] = noun;
  updated[2] = verb;
  return updated;
};

const run = (program: number[], instructionPointer = 0): number[] => {
  // console.log({ currentIndex });
  const opcode = program[instructionPointer];
  const indexOfInput1 = program[instructionPointer + 1];
  const indexOfInput2 = program[instructionPointer + 2];
  const input1 = program[indexOfInput1];
  const input2 = program[indexOfInput2];
  const indexToReplace = program[instructionPointer + 3];
  // console.log({ opcode, input1, input2, indexToReplace });

  let result: number;
  switch (opcode) {
    case 1:
      // console.log("1");
      result = input1 + input2;
      break;
    case 2:
      // console.log("2");
      result = input1 * input2;
      break;
    case 99:
    case undefined:
      // console.log("99 or undefined, returning");
      return program;
    default:
      throw new Error("unknown opcode error");
  }

  // console.log({ result });

  const updatedProgram = [...program];
  updatedProgram[indexToReplace] = result;

  return run(updatedProgram, instructionPointer + 4);
};

// const test1 = [1, 0, 0, 0, 99];
// const test2 = [2, 3, 0, 3, 99];
// const test3 = [2, 4, 4, 5, 99, 0];
// const test4 = [1, 1, 1, 4, 99, 5, 6, 0, 99];
// const res1 = run(test1);
// const res2 = run(test2);
// const res3 = run(test3);
// const res4 = run(test4);
// console.log({ res1 });
// console.log({ res2 });
// console.log({ res3 });
// console.log({ res4 });

const restoredProgram = replaceNounAndVerb(input, 12, 2);
const resultProgram = run(restoredProgram);
const answer2A = resultProgram[0];
// console.log({ resultProgram });
// console.log({ answer2A });

// --- PART 2 ---

// Find the input noun and verb that cause the program to produce the output 19690720.
// What is 100 * noun + verb? (For example, if noun=12 and verb=2, the answer would be 1202.)

interface Combo {
  noun: number;
  verb: number;
}

const possibleInputs = range(0, 99);

const possibleCombos: Combo[] = possibleInputs.reduce(
  (previousCombos: Combo[], noun) => {
    const newCombos = possibleInputs.map(verb => {
      return { noun, verb };
    });

    return [...previousCombos, ...newCombos];
  },
  []
);

// console.log(possibleCombos);

const isAnswer = (combo: Combo) => {
  const program = replaceNounAndVerb(input, combo.noun, combo.verb);
  const output = run(program)[0];
  // console.log({ combo, output });
  return output === 19690720;
};

const answer2B = possibleCombos.find(combo => isAnswer(combo));
console.log({ answer2B });
