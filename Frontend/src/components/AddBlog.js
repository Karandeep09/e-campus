// import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import MultipleSelectDropdown from './MultipleSelectDropdown';
import authHeader from '../sevices/authHeader.service';
import IsLogged from '../sevices/IsLoggedIn.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddBlog = () => {
    // const [value, setValue] = useState('');

    let navigate = useNavigate();
    useEffect(() => {
        if(!IsLogged()){
            console.log("abc");
            navigate("/login");
        }
        else console.log("def");
    })

    function handleSubmit(){
        const heading = document.querySelector('#blog-heading').value;
        const content = document.querySelector('.ql-editor').innerHTML;
        const tags_str = document.querySelector('#blog-tags').innerHTML;
        const tags_array = tags_str.split(',');
        const arr = [];
        for(let i=0; i<tags_array.length; i++)
            arr.push(tags_array.slice(i, i + 1));
        console.log(heading, content, arr);
        const blogdata = {
            title : heading,
            content : content,
            tags : arr
        };

        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(blogdata)
        };
        console.log(requestOptions);
        fetch('http://127.0.0.1:4000/auth/post', requestOptions)
            .then(response => {
                response.json();
                navigate("/bloglist");
            })
            .then(data => {
                console.log(data);
            });
    }

    return (
        <>
            <div className='add-blog'>
                <h3>Add Blog</h3>
                <div className='add-blog-heading'>
                    <h4>Add Heading</h4>
                    <label htmlFor="blog-heading">
                    <input type="text" name="blog-heading" id='blog-heading' placeholder="Blog Heading" required />
                    </label>
                </div>
                <div className='add-blog-content'>
                    <h4>Add Content</h4>
                    {/* <ReactQuill className='editor' theme="snow" value={value} onChange={setValue}/> */}
                    <Editor className='editor' />
                </div>
                <div className='add-blog-tags'>
                    <h4>Add Tags</h4>
                    <MultipleSelectDropdown className='tags-select' />
                </div>
                <div className='add-blog-submit'>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default AddBlog;

// document.querySelector('.ql-editor').innerHTML;    blog content