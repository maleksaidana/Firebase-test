import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isPending} = useLogin();

    const handleSubmit = (e)=>{
        e.preventDefault();
        login(userName,password);
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <h3> Login </h3>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" type="text"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
            <button> {!isPending ? "Sign in" : "Loading" } </button>
            {error && <p> {error} </p>}
        </form>

    );
}

export default Login;
