import { useState } from "react";
import Navbar from "../components/Navbar";
import { useSignup } from "../hooks/useSignup";
import { NavLink } from "react-router";

// Validation function (used on submit)
function validatePassword(password) {
  // Rules: min 8 chars, at least one uppercase, one number, one special char
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*]/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!uppercase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!number.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!specialChar.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null; // means it's valid
}

// Rules for live feedback (used in render)
const passwordRules = [
  { test: /.{8,}/, message: "At least 8 characters" },
  { test: /[A-Z]/, message: "At least one uppercase letter" },
  { test: /[0-9]/, message: "At least one number" },
  { test: /[!@#$%^&*]/, message: "At least one special character (!@#$%^&*)" }
];

export default function Signup () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [statusMessage, setStatusMessage] = useState("")
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validatePassword(password);
        if (validationError) {
            setStatusMessage(""); // clear the "loading" message
            return setStatusMessage(validationError); // show validation feedback
        }
        
        setStatusMessage("Signing you up and logging you in... this may take up to 30 seconds if the server is waking up.");
        
        await signup(email, password)
        
        // If signup/login fails, clear the loading message (error will still show from useSignup)
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
                    <div className="password-checklist">
                    {passwordRules.map((rule, index) => {
                        const passed = rule.test.test(password);
                        return (
                        <div key={index} className={passed ? "rule passed" : "rule"}>
                            {passed ? "✅" : "❌"} {rule.message}
                        </div>
                        );
                    })}
                    </div>

                    <div className="login-signup">Already have an account? <NavLink to='/login'>Log in</NavLink></div>

                    <button disabled={isLoading}>{isLoading ? "Please wait..." : "Sign up"}</button>

                    {/* Dynamic feedback */}
                    {statusMessage && <div className="status">{statusMessage}</div>}
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )

}