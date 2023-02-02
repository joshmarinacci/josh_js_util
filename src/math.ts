export function rand(min: number, max: number) {
    return min + Math.random()*(max-min)
}

export function lerp_number(t:number, s: number, e: number): number {
    if (t <= 0) return s
    if (t >= 1) return e
    return s + (e - s) * t
}

export function range(count: number): number[] {
    let list = []
    for (let i = 0; i < count; i++) {
        list.push(i)
    }
    return list
}

export class Point {
    y: number;
    x: number;
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    add(pt:Point) {
        return new Point(this.x+pt.x,this.y+pt.y)
    }
    subtract(pt: Point) {
        return new Point(this.x-pt.x,this.y-pt.y)
    }
    multiply(point: Point):Point {
        return new Point(this.x*point.x,this.y*point.y)
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    scale(scale: number) {
        return new Point(this.x*scale,this.y*scale)
    }

    toString() {
        return `Point(${this.x.toFixed(1)},${this.y.toFixed(1)})`
    }
    floor():Point {
        return new Point(Math.floor(this.x),Math.floor(this.y))
    }
    clamp(min: Point, max: Point):Point {
        let x = this.x
        if(x < min.x) x = min.x
        if(x > max.x) x = max.x
        let y = this.y
        if(y < min.y) y = min.y
        if(y > max.y) y = max.y
        return new Point(x,y)
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

    lerp(t:number, that:Point):Point {
        return new Point(lerp_number(t,this.x,that.x),lerp_number(t,this.y,that.y))
    }
}
