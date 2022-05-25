let blogdata;
const  blogService = {

    setblog : (blog) =>{
        blogdata = blog;
    },
    getblog : () => {
        return blogdata;
    }
};


export default blogService;