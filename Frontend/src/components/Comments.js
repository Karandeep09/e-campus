const Comments = () => {
    function handleComment(){
        const comment = document.querySelector('#comment-input');
        console.log(comment.value);
    }
    return (
        <>
            <div className="comments">
                <div className="comment">
                    <div className="comment-head">
                        <div className="comment-head-left">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                            <h6>kd</h6>
                        </div>
                        <div>
                            <p className="comment-time">10m</p>
                        </div>
                    </div>
                    <div className="comment-content">
                        <p>Hello World!</p>
                    </div>
                </div>
                <div className="comment">
                    <div className="comment-head">
                        <div className="comment-head-left">
                            <img src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png" alt="Profile" />
                            <h6>kd</h6>
                        </div>
                        <div>
                            <p className="comment-time">10m</p>
                        </div>
                    </div>
                    <div className="comment-content">
                        <p>Hello World!</p>
                    </div>
                </div>
                <div className="comment-input-body">
                    <input type="text" id="comment-input" />
                    <button onClick={handleComment}>comment</button>
                </div>
            </div>
        </>
    );
}
 
export default Comments;