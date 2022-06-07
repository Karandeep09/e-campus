import BlogList from "./BlogList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../sevices/authHeader.service";

const Profile = () => {
    const [me, setMe] = useState(undefined);
    const [edit, setEdit] = useState(false);
    const editProfile = () => {
         if(edit){
             return (<div className="profile-edit">
                     <button onClick={handleEditProfile}>Edit Profile</button>
                     </div>
                    );
          }
          return (<></>);
    };

        const getMe = (username)=>{
            const user = JSON.parse(localStorage.getItem('user'));
            if(username && username === user.username){
                setEdit(true);
            }
            if(username){
                user.username = username;
            } 
                    const headers = authHeader();
                    fetch(`http://127.0.0.1:4000/auth/profile/${user.username}`, {headers})
                        .then(async response => {
                            return response.json();
                        })
                        .then(data => {
                            setMe(data);
                            console.log(data);
                        });    
                
            }
        
        const location = useLocation();        
        useEffect( () => {
          if(location && location.state && location.state.username){  
            console.log("Loc", location.state);
            getMe(location.state.username);
          } 
          else{
              setEdit(true);
              getMe(undefined);
          }
        }   
        ,[location]);        

                    const renderProfile = () => {
                if(me && me.length){
                   return (
                     <div className="profile-about">
                        <h5>{me[0].username}</h5>
                        <p><strong className="strong">Name:</strong>{me[0].nm}</p>
                        <p><strong className="strong">Branch:</strong>{me[0].branch}</p>
                        <p><strong className="strong">Batch:</strong>{me[0].batch}</p>
                        <p><strong className="strong">Email:</strong>{me[0].email}</p>
                    </div>
                   );
               }   
               return (<></>);
            }    
            const renderBio = () => {
                if(me && me.length){
                    return (<p>
                        {me[0].bio}
                      </p>
                    );
                }
                else{
                    return (<></>);
                }
            };
              
    let navigate = useNavigate();
    function handleEditProfile(){
        navigate('/editprofile', {state:{username : me[0].username}});
    }
    return (
        <> 
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-img">
                        <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                    </div>
                    {renderProfile()}
                </div>
                <div className="profile-bio">
                    <p><strong className="strong">Bio:</strong></p>
                    {renderBio()}
                </div>
                {editProfile()}
            </div>
        </>
    );
}
 
export default Profile;