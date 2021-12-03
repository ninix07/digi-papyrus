import './loginstyle.css';
import { useState } from 'react'
import axios from 'axios';



function App() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');


  const addtolist = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/db/'
    axios.post(url, {
      name: name,
      email: email,
      password: password
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  return (
    <div className="login">
      <h1>Sign Up</h1>
      <input type="textbox"
        placeholder="Name"
        onChange={(event) => {
          setname(event.target.value)
        }} />
      <input type="email"
        placeholder="Email Address"
        onChange={(event) => {
          setemail(event.target.value)
        }} />
      <input type="password"
        placeholder="Password"
        onChange={(event) => {
          setpassword(event.target.value)
        }} />
      <input type="password"
        placeholder="Confirm Password"
        onChange={(event) => {
          setpassword2(event.target.value)
        }} />
      {/* <Link to="/transition"> */}
      <button
        onClick={addtolist}
        className="sumbit">
        Continue
      </button>
      {/* </Link> */}
    </div>
  );
}

export default App;
