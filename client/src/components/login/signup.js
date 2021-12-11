import './loginstyle.css';
import { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function App() {
    //use states to change the variable on change
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [message, setMessage] = useState("");
    const history = useHistory();
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
                if (res.data.error !== "") {
                    history.push('/signup')
                    setMessage(res.data.error)
                }
                else {
                    history.push('/transition')

                }

            })

    }

    // goodnight i sleep¿

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
            <button onClick={addtolist}
                className="sumbit">
                Continue
            </button>
        </div>
    );
}

export default App;
