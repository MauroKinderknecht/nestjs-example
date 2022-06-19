export class InvalidModelError extends Error {
  constructor(model: string) {
    super(`Invalid Model Error: model ${model} is invalid`);
  }
}
