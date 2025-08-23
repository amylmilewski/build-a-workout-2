import { useState } from "react";
import Navbar from "../components/Navbar";
import { useSignup } from "../hooks/useSignup";
import { NavLink } from "react-router";

export default function Signup () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <form className="form-panel" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>

                    <label>Email:</label>
                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label>Password:</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div className="login-signup">Already have an account? <NavLink to='/login'>Log in</NavLink></div>
                    <button disabled={isLoading}>Sign Up</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )

}