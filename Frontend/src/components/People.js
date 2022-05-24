import { BiEdit } from "react-icons/bi";

const People = () => {
    return ( 
        <>
            <h6>Search Profiles:</h6>
            <div className="search-people">
                <input type="text" name="search-people" id="search-people" />
                <BiEdit />
            </div>
            <div className="search-profiles">
                <div>
                    <div className="blog-header-left">
                        <div className="blog-header-img">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                        </div>
                        <div className="blog-header-profile">
                            <h6>Aman Gupta</h6>
                            <p>Information Technology, 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default People;