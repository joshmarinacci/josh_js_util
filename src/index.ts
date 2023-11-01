export interface Logger {
  info(...args: any[]): void;

  error(...args: any[]): void;

  warn(...args: any[]): void;

  assert(cond: boolean, msg: string): void;
}

class ConsoleLogger implements Logger {
  prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }
  error(...args: any[]) {
    console.error(`${this.prefix}:ERROR`, ...args);
  }

  info(...args: any[]) {
    console.info(`${this.prefix}:INFO`, ...args);
  }

  warn(...args: any[]) {
    console.warn(`${this.prefix}:WARN`, ...args);
  }

  assert(cond: boolean, msg: string): void {
    if (!cond) throw new Error(`${this.prefix}:ASSERT FAILED ${msg}`);
    console.log(`${this.prefix}:ASSERT`, msg);
  }
}

export function make_logger(prefix?: string): Logger {
  return new ConsoleLogger(prefix ? prefix : "");
}

export function sleep(sec: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(() => res(), Math.floor(sec * 1000));
  });
}

export function toRadians(param: number) {
  return ((Math.PI * 2) / 360) * param;
}

export function pick<T>(arr: T[]): T {
  let n = Math.floor(Math.random() * arr.length);
  return arr[n];
}

export * from "./math.js";
export * from "./jarray.js";
export * from "./arraygrid.js";
