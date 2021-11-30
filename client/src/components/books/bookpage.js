import Bookself from './bookself'
import './bookpage.css'
function Bookpage() {
    return (
        <div className="books">
            <Bookself content="Recently read" books={[
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '200px',
                    description: "jdflka ajdlk akdl jadkl"
                },
                {
                    writer: "Nirjal ajdlk",
                    bookname: 'nadflkj',
                    color: 'red',
                    width: '51px',
                    height: '150px',
                    description: "afdjlk"
                },
                {
                    writer: "Nirjaladkl j",
                    bookname: 'nadflkj',
                    color: 'yellow',
                    width: '51px',
                    height: '200px',
                    description: "fldka l;ds k"
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: '#CB9231',
                    width: '51px',
                    height: '205px',
                    description: " fal;k ad;lk ;la "
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '190px',
                    description: "dl"
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'grey',
                    width: '51px',
                    height: '200px',
                    description: " ad kadl; "
                },
                {
                    writer: "Nirjal ajdlk",
                    bookname: 'nadflkj',
                    color: 'red',
                    width: '51px',
                    height: '150px',
                    description: "da adkl"
                },
                {
                    writer: "Nirjaladkl j",
                    bookname: 'nadflkj',
                    color: 'yellow',
                    width: '51px',
                    height: '200px',
                    description: "adf al jadkl"
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: '#CB9231',
                    width: '51px',
                    height: '205px',
                    description: "a da jadkl"
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '190px',
                    description: " adkf;la jadkl"
                }]} />
            <Bookself content="Top Choices" books={[
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '200px',
                },
                {
                    writer: "Nirjal ajdlk",
                    bookname: 'nadflkj',
                    color: 'red',
                    width: '51px',
                    height: '150px',
                },
                {
                    writer: "Nirjaladkl j",
                    bookname: 'nadflkj',
                    color: 'yellow',
                    width: '51px',
                    height: '200px',
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: '#CB9231',
                    width: '51px',
                    height: '205px',
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '190px',
                }, {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'grey',
                    width: '51px',
                    height: '200px',
                },
                {
                    writer: "Nirjal ajdlk",
                    bookname: 'nadflkj',
                    color: 'red',
                    width: '51px',
                    height: '150px',
                },
                {
                    writer: "Nirjaladkl j",
                    bookname: 'nadflkj',
                    color: 'yellow',
                    width: '51px',
                    height: '200px',
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: '#CB9231',
                    width: '51px',
                    height: '205px',
                },
                {
                    writer: "Nirjal adkljf",
                    bookname: 'nadflkadfklj',
                    color: 'blue',
                    width: '51px',
                    height: '190px',
                }]} />
        </div>
    )
}
export default Bookpage;