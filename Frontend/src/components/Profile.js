import BlogList from "./BlogList";

const Profile = () => {
    
    return (
        <>
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-img">
                        <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                    </div>
                    <div className="profile-about">
                        <h5>@amn</h5>
                        <p><strong>Name:</strong> Aman Gupta</p>
                        <p><strong>Branch:</strong> Information Technology</p>
                        <p><strong>Batch:</strong> 2022</p>
                        <p><strong>Email:</strong> amn@email.com</p>
                    </div>
                </div>
                <div className="profile-bio">
                    <h5>Bio:</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className="profile-blogs">
                </div>
            </div>
        </>
    );
}
 
export default Profile;