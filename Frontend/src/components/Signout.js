import IsLogged from "../sevices/IsLoggedIn.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signout = () => {
    localStorage.removeItem("user");
    let navigate = useNavigate();
    useEffect(() => {
        if(!IsLogged()){
            console.log("abc");
            navigate("/login");
            window.location.reload();
        }
        else console.log("def");
    })
}

export default Signout;