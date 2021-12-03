import './App.css';
import Bookpage from './components/books/bookpage';
import Login from './components/login/login';
import Signup from './components/login/signup';
import Transition from './components/login/transition'
import Newpassword from './components/login/newpassword';
import Forget from './components/login/forget'
import Nav from './components/nav/nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        {/* changing the links using route and links */}
        <Route path="/" exact component={Bookpage} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path='/transition' exact component={Transition} />
        <Route path='/newpassword' exact component={Newpassword} />
        <Route path='/forget' exact component={Forget} />
      </div>
    </Router>
  )
}

export default App;
