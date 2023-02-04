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

export class Size {
    w: number;
    h: number;
    constructor(w:number, h:number) {
        this.w = w
        this.h = h
    }
    set(w: number, h: number) {
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

export class Insets {
    top:number
    right:number
    bottom:number
    left:number
    constructor(top,right,bottom,left) {
        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left
    }
}

export class Bounds {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y:number, w:number, h:number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    get x2():number {
        return this.x + this.w
    }
    get y2(): number {
        return this.y + this.h
    }
    contains(pt: Point):boolean {
        if(pt.x < this.x) return false
        if(pt.y < this.y) return false
        if(pt.x > this.x+this.w) return false
        if(pt.y > this.y+this.h) return false
        return true
    }
    // intersects(b:Bounds):boolean {
    //     let p1 = b.position
    //     if(this.contains(p1)) return true
    //     let p2 = new Point(b.position.x+b.size.w,b.position.y)
    //     if(this.contains(p2)) return true
    //     let p3 = new Point(b.position.x+b.size.w,b.position.y+b.size.h)
    //     if(this.contains(p3)) return true
    //     let p4 = new Point(b.position.x,b.position.y+b.size.h)
    //     if(this.contains(p4)) return true
    //     return false
    // }

    set(number: number, number2: number, number3: number, h: number) {
        this.x = number
        this.y = number2
        this.w = number3
        this.h = h
    }

    add_self(point: Point) {
        this.x += point.x
        this.y += point.y
    }

    add(point: Point) {
        return new Bounds(this.x+point.x,this.y+point.y,this.w,this.h)
    }

    bottom():number {
        return this.y + this.h
    }
    left():number {
        return this.x
    }
    right():number {
        return this.x + this.w
    }
    top():number {
        return this.y
    }

    center():Point {
        return new Point(this.x+this.w/2, this.y+this.h/2)
    }

    intersects(other: Bounds):boolean {
        if(this.left() >= other.right()) return false
        if(this.right() <= other.left()) return false
        if(this.top() >= other.bottom()) return false
        if(this.bottom() <= other.top()) return false
        return true
    }
    toString() {
        return `(${this.x.toFixed(1)},${this.y.toFixed(1)})x(${this.w.toFixed(1)},${this.h.toFixed(1)})`
    }

    top_right():Point {
        return new Point(this.x+this.w,this.y)
    }

    bottom_right():Point {
        return new Point(this.x+this.w,this.y+this.h)
    }

    bottom_left():Point {
        return new Point(this.x,this.y+this.h)
    }

    top_left():Point {
        return new Point(this.x,this.y)
    }

    copy():Bounds {
        return new Bounds(this.x,this.y,this.w,this.h)
    }

    sides():Insets {
        return new Insets(
            this.top(),
            this.right(),
            this.bottom(),
            this.left()
        )
    }
}
