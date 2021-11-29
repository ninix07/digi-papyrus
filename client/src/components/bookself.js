import Books from './books'
import './books.css'
function Bookself(prop) {
    return (
        <div className="whole">
            <div className="content"><h1>{prop.content}</h1></div>
            <div className="self">
                {prop.books.map((book) => (
                    <Books color={book.color}
                        writersname={book.writer}
                        bookname={book.bookname}
                        width={book.width}
                        height={book.height}
                        description={book.description} />
                ))
                }
            </div>
        </div>
    )
}
export default Bookself;