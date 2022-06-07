import React from 'react';
import  { useNavigate } from 'react-router-dom';

const Login = () => {
    function handleSwitchBtn(){
        document.querySelector('#sec-0').classList.toggle("hidden");
        document.querySelector('#sec-1').classList.toggle("hidden");
    }
    const navigate = useNavigate();

    function logincall(username, password){
        const data = {
            username : username,
            password : password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('http://127.0.0.1:4000/users/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.token){
                    localStorage.setItem("user", JSON.stringify(data));
                    navigate("/bloglist");
                    window.location.reload();
                }
            });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        logincall(e.target[0].value, e.target[1].value);
        document.getElementById('sec-0').reset();
    }

    const handleSubmitSignup = (e) => {
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
        fetch('http://127.0.0.1:4000/users/createUser', requestOptions)
            .then(response => {
                document.getElementById('sec-1').reset();
                logincall(data.username, data.password);
                response.json()
            }).then(data => {
                console.log(data);
                window.location.reload();
            });

        document.getElementById('sec-1').reset();
        // logincall(data.username, data.password);
    }

    return (
        <>
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

            <p className="switch-btn-text text-center">Already Registered?</p>
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