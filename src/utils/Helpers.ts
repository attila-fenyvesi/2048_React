export const range = (
  param_1: number,
  param_2?: number,
  param_3?: number
): number[] => {
  const start = param_2 === undefined ? 0 : param_1;
  const end = param_2 === undefined ? param_1 : param_2;
  const step = param_3 === undefined ? 1 : Math.abs(param_3);

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    !Number.isInteger(step)
  ) {
    throw "Only integer parameters are accepted!";
  }

  const difference = end - start;
  if (difference === 0) {
    return [start];
  }

  const keys = Array(Math.ceil((Math.abs(difference) + 1) / step)).keys();

  return Array.from(keys).map((x) => {
    const increment = end > start ? x : -x;
    return start + increment * step;
  });
};
