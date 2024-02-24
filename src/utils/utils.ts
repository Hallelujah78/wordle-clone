type GetRandomFunction = (min: number, max: number) => number;

export const getRandomArbitrary: GetRandomFunction = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
