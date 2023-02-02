import {Point} from "./math.js";


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


export class Size {
    readonly w: number;
    readonly h: number;
    constructor(w:number, h:number) {
        this.w = w
        this.h = h
    }
    scale(scale:number):Size {
        return new Size(this.w*scale,this.h*scale)
    }
    asPoint():Point {
        return new Point(this.w,this.h)
    }
}

export class Bounds {
    readonly position: Point;
    readonly size: Size;
    constructor(position:Point, size:Size) {
        this.position = position
        this.size = size
    }
    get x2():number {
        return this.position.x + this.size.w
    }
    get y2(): number {
        return this.position.y + this.size.h
    }
    contains(pt: Point):boolean {
        if(pt.x < this.position.x) return false
        if(pt.y < this.position.y) return false
        if(pt.x > this.position.x+this.size.w) return false
        if(pt.y > this.position.y+this.size.h) return false
        return true
    }
    intersects(b:Bounds):boolean {
        let p1 = b.position
        if(this.contains(p1)) return true
        let p2 = new Point(b.position.x+b.size.w,b.position.y)
        if(this.contains(p2)) return true
        let p3 = new Point(b.position.x+b.size.w,b.position.y+b.size.h)
        if(this.contains(p3)) return true
        let p4 = new Point(b.position.x,b.position.y+b.size.h)
        if(this.contains(p4)) return true
        return false
    }

    // scale(scale: number) {
    //     return new Rect(this.x*scale,this.y*scale,this.w*scale,this.h*scale)
    // }

    // add(r2: Rect) {
    //     if( this.empty && !r2.empty) return r2
    //     if(!this.empty &&  r2.empty) return this.clone()
    //     let x1 = Math.min(this.x,  r2.x)
    //     let x2 = Math.max(this.x2, r2.x2)
    //     let y1 = Math.min(this.y,  r2.y)
    //     let y2 = Math.max(this.y2, r2.y2)
    //     return new Rect(x1, y1, x2-x1, y2-y1)
    // }

    // makeEmpty() {
    //     let rect = new Bounds(
    //         Number.MAX_VALUE,
    //         Number.MAX_VALUE,
    //         Number.MIN_VALUE,
    //         Number.MIN_VALUE
    //     )
    //     rect.empty = true
    //     return rect
    // }
    //
    // translate(position: Point) {
    //     return new Rect(this.x+position.x,this.y+position.y,this.w,this.h)
    // }

    // grow(pt:Point) {
    //     return new Rect(
    //         this.x - pt.x,
    //         this.y - pt.y,
    //         this.w + pt.x+pt.x,
    //         this.h + pt.y+pt.y,
    //     )
    // }
    //
    center() {
        return new Point(this.position.x+this.size.w/2, this.position.y + this.size.h/2)
    }
}


export * from "./math.js"
export * from "./jarray.js"
export * from "./arraygrid.js"
