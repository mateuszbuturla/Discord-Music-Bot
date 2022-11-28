import { Arg } from './../types/command';

export const checkIfAllRequiredArgsAreGiven = (
  commandArgs: Arg[],
  givenArgs: string[],
): Arg[] => {
  let notGivenArgs: Arg[] = [];

  commandArgs.forEach((arg, index) => {
    if (!arg.required) {
      return;
    }

    if (givenArgs.length <= index) {
      notGivenArgs = [...notGivenArgs, arg];
    }
  });

  return notGivenArgs;
};
