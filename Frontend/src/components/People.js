import { BiSearchAlt } from "react-icons/bi";

const People = () => {
    return ( 
        <>
        <div className="people-comp">
            <h5>Search Profiles <BiSearchAlt /></h5>
            <div className="search-people">
                <form>
                    <input type="text" name="search-people" id="search-people" />
                </form>
            </div>
            <div className="search-profiles">
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
            </div>
            <div className="search-profiles">
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
            </div>
            <div className="search-profiles">
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
            </div>
        </div>
        </>
     );
}
 
export default People;