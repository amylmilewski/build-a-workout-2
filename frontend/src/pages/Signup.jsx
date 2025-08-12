import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Signup () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
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

                    <button>Sign Up</button>
                </form>
            </div>
        </>
    )

}