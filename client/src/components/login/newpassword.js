import './loginstyle.css'
function Newpassword(){
    return(
        <div class="login">
            <h1>New Password</h1>
            <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm New Password"/>
           <a href="/login.html"><button class="sumbit">Continue</button></a>
        </div>
    )
}
export default Newpassword;