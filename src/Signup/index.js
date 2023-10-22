import { useState } from "react";
import { useSignup } from '../hooks/useSignup'


function Signup() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const {signup, isPending, error} = useSignup();

    const handleSubmit = (e)=>{
        e.preventDefault();
        signup(userName, password, displayName);

    }

    return (
        <form onSubmit={handleSubmit} className="signup">
            <h3> Sign up </h3>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" type="text"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" type="text"/>
            <button> {!isPending ? "Signup" : "Loading"}  </button>
            {error && <p> {error}</p>}
        </form>

    );
}

export default Signup;
