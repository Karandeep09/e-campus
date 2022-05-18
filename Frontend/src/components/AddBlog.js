// import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import MultipleSelectDropdown from './MultipleSelectDropdown';

const AddBlog = () => {
    // const [value, setValue] = useState('');
    function handleSubmit(){
        const heading = document.querySelector('#blog-heading').value;
        const content = document.querySelector('.ql-editor').innerHTML;
        const tags_str = document.querySelector('#blog-tags').innerHTML;
        const tags_array = tags_str.split(',');
        const arr = [];
        for(let i=0; i<tags_array.length; i++)
            arr.push(tags_array.slice(i, i + 1));
        console.log(heading, content, arr);
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