import './books.css'
// import Card from './card'
import { useState } from 'react';
function Books(prop) {
    const book = {
        backgroundColor: prop.color,
        height: prop.height,
        width: prop.width
    };
    const [oopacity, setoopacity] = useState(0)
    function mouseenter() {
        setoopacity(1)
    }
    function mouseleave() {
        setoopacity(0)
    }
    return (
        <div onMouseEnter={mouseenter} onMouseLeave={mouseleave}>
            <div className="card" style={{ opacity: oopacity }}>
                {/* <Card className="card" genre="Horror" booktitle={prop.bookname} writer={prop.writersname} /> */}
            </div>
            <div style={book} className='book'>
                <p className="bookname">{prop.bookname}<br />{prop.writersname}</p>
            </div>
        </div>

    )
}
export default Books;
