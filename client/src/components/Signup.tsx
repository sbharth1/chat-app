import { Link } from "react-router-dom"

const Signup = () => {
  return (<>
    <h1>Signup</h1>
      <input type="text" />
      <button>send</button>
      <Link to={"/login"}>signup page</Link>

    </>
  )
}

export default Signup