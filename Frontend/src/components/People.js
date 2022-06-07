import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import authHeader from "../sevices/authHeader.service";
import { useNavigate } from "react-router-dom";
import IsLogged from '../sevices/IsLoggedIn.service';
import $ from "jquery";
const People = () => {
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchPeople, setSearchPeople] = useState([]);
    let navigate = useNavigate();
    useEffect(
          () => {
            if(!IsLogged()){
                console.log("abc");
                navigate("/login");
            }
           async  function setup () { 
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/people`,
                {
                   headers: authHeader()
               }
             );
             setPeople(res.data);
           }  
            setup();  
        },
    []);
    let value;
    function matches(people){
        let pattern = new RegExp(`^${value}`);
        return pattern.test(people.username);
    }
    $("#search-people").on("input", ()=>{
        value = $("#search-people").val();
        if(value){
            setSearch(true);
            console.log(value);
            setSearchPeople(people.filter(matches));
        }
        else{
            setSearch(false);
        }
        console.log(search);
    });
    function openProfile(username){
        // alert(username);
        navigate('/profile', {state : {username : username}});    
    }       
    function handlePeopleSearch(e){
        e.preventDefault();
        const searchEl = document.querySelector('#search-people');
        console.log(searchEl.value);
    }
    function renderPeople(){
        if(search){     
         return searchPeople.map(
               maihuna =>  (
                      <div className="search-profiles">
                  <div className="search-profiles-body">
                      <div className="blog-header-left">
                          <div className="blog-header-img">
                              <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                          </div>
                          <div className="blog-header-profile">
                              <h6>{maihuna.username}</h6>
                              <p>{maihuna.branch}, {maihuna.batch}</p>
                          </div>
                      </div>
                      <div className="blog-header-right" onClick={ () => {openProfile(maihuna.username);} }>
                          <p>Open</p>
                      </div>
                     </div>
                   </div>
              ));
        } 
        else{
          return  people.map(
                maihuna =>  (
                       <div className="search-profiles">
                   <div className="search-profiles-body">
                       <div className="blog-header-left">
                           <div className="blog-header-img">
                               <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                           </div>
                           <div className="blog-header-profile">
                               <h6>{maihuna.username}</h6>
                               <p>{maihuna.branch}, {maihuna.batch}</p>
                           </div>
                       </div>
                       <div className="blog-header-right" onClick={ () => {openProfile(maihuna.username);} }>
                           <p>Open</p>
                       </div>
                      </div>
                    </div>
               )); 
            }     
    }
    return ( 
        <>
        <div className="people-comp">
            <h5>Search Profiles <BiSearchAlt /></h5>
            <div className="search-people">
                <form onSubmit={handlePeopleSearch}>
                    <input type="text" name="search-people" id="search-people" />
                </form>
            </div>
            <>
          {renderPeople()}  
          
            </>
            {/* <div className="search-profiles">
                <div className="search-profiles-body">
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>Aman Gupta</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                    <div className="blog-header-right">
                        <p>Open</p>
                    </div>
                </div>
            </div> */}
            {/* <div className="search-profiles">
                <div className="search-profiles-body">
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>Aman Agrahari</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                    <div className="blog-header-right">
                        <p>Open</p>
                    </div>
                </div>
            </div> */}
            {/* <div className="search-profiles">
                <div className="search-profiles-body">
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>Karandeep Singh</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                    <div className="blog-header-right">
                        <p>Open</p>
                    </div>
                </div>
            </div> */}
        </div>
        </>
     );
}
 
export default People;