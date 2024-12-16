import { Link } from "react-router-dom"

const Login = () => {
  return (<>
     <h1>Login</h1>
    <input type="text" />
    <button>send</button>
    <Link to={"/signup"}>signup page</Link>
    </> 
    )
}

export default Login