import {Logger, LoggerOutput, StdLogger} from "./log.ts";

export function make_logger(prefix?: string, enabled?:boolean, outputs?:LoggerOutput[]): Logger {
  return new StdLogger(prefix, enabled, outputs)
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
export * from "./log.ts";
