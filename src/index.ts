export interface Logger {
  info(...args: any[]): void;

  error(...args: any[]): void;

  warn(...args: any[]): void;

  assert(cond: boolean, msg: string): void;

  setEnabled(enabled: boolean): void;
}

class ConsoleLogger implements Logger {
  prefix: string;
  private enabled: boolean;
  constructor(prefix: string) {
    this.prefix = prefix;
    this.enabled = true;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  error(...args: any[]) {
    if (this.enabled) console.error(`${this.prefix}:ERROR`, ...args);
  }

  info(...args: any[]) {
    if (this.enabled) console.info(`${this.prefix}:INFO`, ...args);
  }

  warn(...args: any[]) {
    if (this.enabled) console.warn(`${this.prefix}:WARN`, ...args);
  }

  assert(cond: boolean, msg: string): void {
    if (!cond) throw new Error(`${this.prefix}:ASSERT FAILED ${msg}`);
    if (this.enabled) console.log(`${this.prefix}:ASSERT`, msg);
  }
}

export function make_logger(prefix?: string): Logger {
  return new ConsoleLogger(prefix ? prefix : "");
}

export function sleep(sec: number): Promise<void> {
  return new Promise((res, _rej) => {
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
