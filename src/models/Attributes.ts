export class Attributes<T extends object> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set(update: T): void {
    this.data = Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
