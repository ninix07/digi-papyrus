import './loginstyle.css';
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



function App() {
    //use states to change the variable on change
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [error, setError] = useState(1);
    const [message, setMessage] = useState('');
    const [linkhere, setLinkhere] = useState('/signup');

    //function 
    //@params e event
    //brief: cheaks all the validity and sends the api reqeust
    const addtolist = async (e) => {

        e.preventDefault();
        // url wehre the data should be post 
        axios.post('http://localhost:5000/api/register/', {
            name: name,
            email: email,
            password: password,
            password2: password2,
        })
            .then(res => {
                setMessage(res.data.error);
                if (message) {
                    setError(1)
                }
                else {
                    setError(0)
                }

            })


        if (error === 1) {
            setLinkhere('/signup')
            console.log(' error')
        }
        else {
            setLinkhere('/transition')
            console.log('no error')
        }
        console.log("end  " + error + '\n' + message);
    }



    return (
        <div className="login">
            <h1>Sign Up</h1>

            <input type="textbox"
                placeholder="Name"
                onChange={(event) => {
                    setname(event.target.value)
                }}
                required />
            <input
                type="email"
                placeholder="Email Address"
                onChange={(event) => {
                    setemail(event.target.value)
                }}
                required />
            <input type="password"
                placeholder="Password"
                onChange={(event) => {
                    setpassword(event.target.value)
                }}
                required />
            <input type="password"
                placeholder="Confirm Password"
                onChange={(event) => {
                    setpassword2(event.target.value)
                }} />

            <p style={{ color: "red" }}> {message} </p>
            <Link onClick={addtolist} to={linkhere}>
                <button
                    className="sumbit">
                    Continue
                </button>
            </Link>

        </div>
    );
}

export default App;
