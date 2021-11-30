import './loginstyle.css'
import { Link } from 'react-router-dom';
function Forget() {
    return (
        <div class="login">
            <h1>Recovery</h1>
            <input type="textbox" placeholder="Username" />
            <input type="email" placeholder="Email Address" />
            <Link to = "/transition"><button class="sumbit">Continue</button></Link>
        </div>
    )
}
export default Forget;