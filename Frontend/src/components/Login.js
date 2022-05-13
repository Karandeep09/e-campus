import React from 'react';

const Login = () => {
    function handleSwitchBtn(){
        document.querySelector('#sec-0').classList.toggle("hidden");
        document.querySelector('#sec-1').classList.toggle("hidden");
    }
    return (
        <>
        <div className='login-header'>
            <p>E-Campus</p>
        </div>
        <div className="container auth my-4">
            <form className="login switch" id="sec-0">
            <h3>Log In</h3>
            <label for="email">Email:
            <input type="email" name="email" placeholder="Email" required />
            </label>
            <label for="password">Password:
            <input type="password" name="password" placeholder="Password" required />
            </label>
            <button type="submit">Login</button>

            <p className="switch-btn-text text-center">Don't have an account?</p>
            <p className="switch-btn text-center" onClick={() => handleSwitchBtn()}>Sign Up</p>
        </form>

        <form className="signup switch hidden" id="sec-1">
            <h3>Sign Up</h3>
            <label for="user-name">Name:
            <input type="user-name" name="user-name" placeholder="Name" required />
            </label>
            <label for="email">Email:
            <input type="email" name="email" placeholder="Email" required />
            </label>
            <label for="password">Password:
            <input type="password" name="password" placeholder="Password" required />
            </label>
            <button type="submit">Signup</button>

            <p className="switch-btn-text text-center">Already Registered.</p>
            <p className="switch-btn text-center" onClick={() => handleSwitchBtn()}>Sign In</p>
        </form>
        <footer>
            <p className="center">&copy; IT-Nerds</p>
        </footer>
        </div>
        </>
    );
}
 
export default Login;