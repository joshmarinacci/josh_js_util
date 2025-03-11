
export abstract class Logger {
    public abstract info(...args: any[]): void;

    public abstract error(...args: any[]): void;

    public abstract warn(...args: any[]): void;

    public abstract assert(cond: boolean, msg: string): void;

    public abstract setEnabled(enabled: boolean): void;
}

export type LogPriority = "INFO" | "ERROR" | "WARN";
export type LoggerEvent = {
    prefix:string
    priority:LogPriority
    timestamp:number
    message:string
    args:any[]
}
export type LoggerOutput = {
    log(evt: LoggerEvent): void;
}

export class StdLogger extends Logger {
    private prefix: string;
    private outputs: LoggerOutput[];
    private enabled: boolean;

    constructor(prefix: string | undefined, enabled?: boolean | undefined, outputs?: LoggerOutput[] | undefined) {
        super();
        this.prefix = prefix || "";
        this.enabled = enabled || true;
        this.outputs = outputs || [new ConsoleOutput()];
    }

    add(tl: LoggerOutput) {
        this.outputs.push(tl);
    }
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public info(...args: unknown[]): void {
        this.logit("INFO",args)
    }
    public error(...args: unknown[]): void {
        this.logit("ERROR",args)
    }
    public warn(...args: unknown[]): void {
        this.logit("WARN",args)
    }

    public assert(cond: boolean, msg: string): void {
        if (!cond) throw new Error(`${this.prefix}:ASSERT FAILED ${msg}`);
        if (this.enabled) console.log(`${this.prefix}:ASSERT`, msg);
    }

    private log(evt: LoggerEvent) {
        if(this.enabled) this.outputs.forEach((output: LoggerOutput) => output.log(evt))
    }

    private logit(priority: LogPriority, args: unknown[]) {
        if(args.length > 0) {
            const msg = args[0];
            let message:string = ""
            if(typeof msg === "string") {
                message = msg;
            } else {
                message = msg+""
            }
            args = args.slice(1)
            const evt: LoggerEvent = {
                prefix: this.prefix,
                message: message,
                priority: priority,
                timestamp: Date.now(),
                args: args,
            }
            this.log(evt);
        }

    }
}

export class ConsoleOutput implements LoggerOutput {
    log(evt: LoggerEvent): void {
        console.log(evt.prefix, evt.priority, evt.timestamp, evt.message, evt.args);
    }

}