
export interface Logger {
    info(...args: any[]):void

    error(...args: any[]):void

    warn(...args: any[]):void

    assert(cond: boolean, msg: string): void;
}

class ConsoleLogger implements Logger {
    prefix:string
    constructor(prefix:string) {
        this.prefix = prefix
    }
    error(...args: any[]) {
        console.error(`${this.prefix}:ERROR`, ...args)
    }

    info(...args: any[]) {
        console.info(`${this.prefix}:INFO`, ...args)
    }

    warn(...args: any[]) {
        console.warn(`${this.prefix}:WARN`, ...args)
    }

    assert(cond: boolean, msg: string): void {
        if(!cond) throw new Error(`${this.prefix}:ASSERT FAILED ${msg}`)
        console.log(`${this.prefix}:ASSERT`,msg)
    }

}

export function make_logger(prefix?:string): Logger {
    return new ConsoleLogger(prefix?prefix:"")
}

export function sleep(sec: number): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(() => res(), Math.floor(sec * 1000))
    })
}

export function toRadians(param: number) {
    return Math.PI * 2 / 360 * param
}

export function pick<T>(arr: T[]):T {
    let n = Math.floor(Math.random() * arr.length)
    return arr[n]
}

export class Point {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    add(pt: Point) {
        return new Point(this.x+pt.x, this.y+pt.y)
    }
    subtract(pt: Point) {
        return new Point(this.x-pt.x, this.y-pt.y)
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    scale(scale: number) {
        return new Point(this.x*scale,this.y*scale)
    }
    clone() {
        return new Point(this.x,this.y)
    }
    toJSON() {
        return {
            x:this.x,
            y:this.y,
        }
    }

    static fromJSON(point: { x: number; y: number }) {
        return new Point(point.x,point.y)
    }
}

export class Size {
    readonly w: number;
    readonly h: number;
    constructor(w:number, h:number) {
        this.w = w
        this.h = h
    }
}

export class Bounds {
    readonly position: Point;
    readonly size: Size;
    constructor(position:Point, size:Size) {
        this.position = position
        this.size = size
    }
}
