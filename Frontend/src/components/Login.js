import React from 'react';

const Login = () => {
    function handleSwitchBtn(){
        document.querySelector('#sec-0').classList.toggle("hidden");
        document.querySelector('#sec-1').classList.toggle("hidden");
    }

    function handleSubmitLogin(e){
        e.preventDefault();
        const data = {
            username : e.target[0].value,
            password : e.target[1].value
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('http://192.168.186.145:3000/users/login', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

            document.getElementById('sec-0').reset();
    }

    function handleSubmitSignup(e){
        e.preventDefault();
        const data = {
            email : e.target[0].value,
            name : e.target[1].value,
            username : e.target[2].value,
            password : e.target[3].value
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://192.168.186.145:3000/users/createUser', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        document.getElementById('sec-1').reset();
    }

    return (
        <>
        <div className='login-header'>
            <p>E-Campus</p>
        </div>
        <div className="container auth my-4">

        <form className="login switch" id="sec-0" onSubmit={handleSubmitLogin}>

            <h3>Log In</h3>
            <label htmlFor="username">Username:
            <input type="text" name="username" placeholder="Username" required />
            </label>
            <label htmlFor="password">Password:
            <input type="password" name="password" placeholder="Password" required />
            </label>
            <button type="submit">Login</button>

            <p className="switch-btn-text text-center">Don't have an account?</p>
            <p className="switch-btn text-center" onClick={() => handleSwitchBtn()}>Sign Up</p>
        </form>

        <form className="signup switch hidden" id="sec-1" onSubmit={handleSubmitSignup}>

            <h3>Sign Up</h3>
            <label htmlFor="email">Email:
            <input type="email" name="email" placeholder="Email" required />
            </label>
            <label htmlFor="name">Name:
            <input type="text" name="name" placeholder="Name" required />
            </label>
            <label htmlFor="username">User Name:
            <input type="text" name="username" placeholder="User Name" required />
            </label>
            <label htmlFor="password">Password:
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