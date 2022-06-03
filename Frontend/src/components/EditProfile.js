const EditProfile = () => {
    return (
        <>
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-img">
                        <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                    </div>
                    <div className="profile-about">
                        <h5>@amn</h5>
                        <p><strong className="strong">Name:</strong> 
                            <input type="text" name="" id="" /> </p>
                        <p><strong className="strong">Branch:</strong> 
                            <input type="text" name="" id="" /> </p>
                        <p><strong className="strong">Batch:</strong>
                            <input type="text" name="" id="" /> </p>
                        <p><strong className="strong">Email:</strong> amn@email.com</p>
                    </div>
                </div>
                <div className="profile-bio">
                    <p><strong className="strong">Bio:</strong></p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="profile-edit">
                    <button>Update</button>
                </div>
            </div>
        </>
    );
}
 
export default EditProfile;