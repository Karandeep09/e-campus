import { BatteryCharging20 } from "@material-ui/icons";
import { useEffect , useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authHeader from "../sevices/authHeader.service";
const EditProfile = () => {
       const [me, setMe] = useState(undefined);
       
       let user = JSON.parse(localStorage.getItem('user')); 
       let navigate = useNavigate();
       let location = useLocation();
       
       useEffect(() => {
        const headers = authHeader();
        fetch(`${process.env.REACT_APP_API_URL}/auth/profile/${location.state.username}`, {headers})
            .then(async response => {
                return response.json();
            })
            .then(data => {
                setMe(data);
                document.querySelector("#name").value = data[0].nm;
                document.querySelector("#branch").value = data[0].branch;
                document.querySelector("#batch").value = data[0].batch;
                document.querySelector("#bio").value = data[0].bio;
            });  
       }
       ,[])

    const handleUpdate = ()=>{
        // console.log(document.querySelector("#bio"));
        let data = {
            name : document.querySelector("#name").value || '',
            branch : document.querySelector("#branch").value,
            batch : document.querySelector("#batch").value,
            bio : document.querySelector("#bio").value
        };
               
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data)
        };
        console.log(requestOptions);
        fetch(`${process.env.REACT_APP_API_URL}/auth/update/profile`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("Profile",data);
                navigate("/profile");
            });
    };
    return (
        <>
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-img">
                        <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                    </div>
                    <div className="profile-about">
                        <h5>{user.username}</h5>
                        <p><strong className="strong">Name:</strong> 
                            <input type="text" name="" id="name" /></p>
                        <p><strong className="strong">Branch:</strong> 
                            <input type="text" name="" id="branch" /></p>
                        <p><strong className="strong">Batch:</strong>
                            <input type="text" name="" id="batch" /></p>
                        <p><strong className="strong">Email:</strong>{user.email}</p>
                    </div>
                </div>
                <div className="profile-bio">
                    <p><strong className="strong">Bio:</strong></p>
                    <textarea name="" id="bio" cols="30" rows="10">me[0].bio</textarea>
                </div>
                <div className="profile-edit">
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </>
    );
}
 
export default EditProfile;