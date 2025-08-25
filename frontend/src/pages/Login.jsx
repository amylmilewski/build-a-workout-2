import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [statusMessage, setStatusMessage] = useState("")
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Show a helpful message when login starts
        setStatusMessage("Logging you in... this may take up to 30 seconds if the server is waking up.");

        await login(email, password)

        // If login fails, clear the loading message (error will still show from useLogin)
        setStatusMessage("")
    }

    return (
        <>
            <Navbar />
            <main className='getting-started'>
            <section className="full-width">
                {/* <h1>Getting Started</h1><br/> */}
                <h3>👋 Welcome to your personal workout routine builder!</h3>
                <p>This app makes it easy to create and organize the exercises you want to do, then group them into routines you can follow later. Whether you’re new to working out or just looking for a simple way to track your training, you’ll be up and running in just a couple of steps.</p>
                <h4>Log in or Sign up below to get started.</h4>
            </section>
            </main>
            <div className="login-container">
                <form className="form-panel" onSubmit={handleSubmit}>
                    <h1>Log in</h1>

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

                    <div className="login-signup">Don't have an account yet? <NavLink to='/signup'>Sign up</NavLink></div>

                    <button disabled={isLoading}>{isLoading ? "Please wait..." : "Log in"}</button>

                    {/* Dynamic feedback */}
                    {statusMessage && <div className="status">{statusMessage}</div>}
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )

}