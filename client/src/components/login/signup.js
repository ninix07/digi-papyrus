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
    const [message, setMessage] = useState('')
    const [namered, setNamered] = useState(0)
    const [emailred, setEmailred] = useState(0)
    const [passwordred, setPasswordred] = useState(0)
    const [password2red, setPassword2red] = useState(0)
    const [error, setError] = useState(1)

    //function 
    //@params e event
    //brief: cheaks all the validity and sends the api reqeust
    const addtolist = async (e) => {
        setError(0);
        setMessage("");
        console.log(message)
        if (!name) {
            setNamered(1);
            setError(1)
            setMessage("*Please fill out the form well*")
        }
        else if (!email) {
            setEmailred(1);
            setError(1)
            setMessage("*Please fill out the form well*")
        }
        else if (!password) {
            setPasswordred(1);
            setError(1)
            setMessage("*Please fill out the form well*")
        }
        else if (!password2) {
            setPassword2red(1);
            setError(1)
            setMessage("*Please fill out the form well*")
        }
        else if (password !== password2) {
            setPasswordred(1);
            setPassword2red(1);
            setError(1)
            setMessage('Password didnt match')
        }
        else if (password.length < 6) {
            setPasswordred(1)
            setPassword2red(1)
            setError(1)
            setMessage("Password must be 6 character long")
        }
        else {
            e.preventDefault();
            // url wehre the data should be post 
            const url = 'http://localhost:5000/api/register/'

            axios.get('http://localhost:5000/message')
                .then(res => {
                    setMessage(res.data.message1)
                })
            axios.post(url, {
                name: name,
                email: email,
                password: password,
                password2: password2,
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        };
    }



    return (
        <div className="login">
            <h1>Sign Up</h1>

            <input className={!namered ? "noborder" : "redborder"} type="textbox"
                placeholder="Name"
                onChange={(event) => {
                    setname(event.target.value)
                }}
                required />
            <input className={!emailred ? "noborder" : "redborder"}
                type="email"
                placeholder="Email Address"
                onChange={(event) => {
                    setemail(event.target.value)
                }}
                required />
            <input className={!passwordred ? "noborder" : "redborder"} type="password"
                placeholder="Password"
                onChange={(event) => {
                    setpassword(event.target.value)
                }}
                required />
            <input className={!password2red ? "noborder" : "redborder"} type="password"
                placeholder="Confirm Password"
                onChange={(event) => {
                    setpassword2(event.target.value)
                }} />

            <p style={{ color: "red" }}> {message} </p>
            <Link to={error ? "/signup" : "/transition"}>
                <button
                    onClick={addtolist}
                    className="sumbit">
                    Continue
                </button>
            </Link>

        </div>
    );
}

export default App;
