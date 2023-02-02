
/*

basic Grid just is a fixed sized structure with iterators and accessors. You
can put anything in it, you want.

since it is fixed sized it must be created with either data passed in,
or with a callback to set each value, or else it is filled with nulls

CellGrid is a grid with specific cells.

*/


import {Point} from "./index.js";
import {assert_eq} from "./assert.js";
import {ArrayGrid} from "./arraygrid.js";


function test_array_grid() {
    let ag1 = new ArrayGrid<string>(2,2)
    ag1.set_at(0,0,'foo')
    ag1.set_at(1,1,'bar')
    assert_eq("same",ag1.get_at(0,0),'foo')
    assert_eq('size',ag1.size(),4)

    let ag2 = new ArrayGrid<number>(2,2)
    ag2.fill((index:Point) => index.x*index.y)

    let ag3 = new ArrayGrid<string>(2,2)
    ag3.set_from_list(['a','b','c','d'])
    assert_eq('filled',ag3.get_at(1,1),'d')


    let pattern = '_XXX_'
    let ag4 = ArrayGrid.fromPattern(pattern,(ch,index)=> (ch === 'X') ? 1 : 0)
    assert_eq('size',ag4.size(),5)
    assert_eq('right value',ag4.get_at(1,0),1)
    assert_eq('right value',ag4.get_at(4,0),0)

    type Particle = {
        color:string
        visible:boolean
        lifetime:number
    }

    let pat2 = `
      RGB
      G_R
      RGB
    `
    let parts = ArrayGrid.fromPattern(pat2,(ch,index) => {
        let part:Particle = {
            color:'red',
            visible:true,
            lifetime:1
        }
        if(ch === 'R') part.color = 'red'
        if(ch === 'G') part.color = 'green'
        if(ch === 'B') part.color = 'blue'
        if(ch === '_') part.visible = false
        return part
    })
    assert_eq('particle grid size',parts.size(),9)
    assert_eq('visible particle',parts.get_at(0,0).visible,true)
    assert_eq('hidden particle',parts.get_at(1,1).visible,false)
}

test_array_grid()

