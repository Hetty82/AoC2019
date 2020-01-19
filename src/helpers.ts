export const range = (first: number, last: number, step = 1): number[] =>
  Array(Math.ceil((last - first) / step + 1))
    .fill(first)
    .map((first: number, index: number) => first + index * step);
