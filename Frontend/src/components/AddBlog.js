import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import MultipleSelectDropdown from './MultipleSelectDropdown';

const AddBlog = () => {
    const [value, setValue] = useState('');
    return (
        <>
            <div className='add-blog'>
                <h3>Add Blog</h3>
                <div className='add-blog-heading'>
                    <h4>Add Heading</h4>
                    <label htmlFor="blog-heading">
                    <input type="text" name="blog-heading" placeholder="Blog Heading" required />
                    </label>
                </div>
                <div className='add-blog-content'>
                    <h4>Add Content</h4>
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue}/>
                    {/* <Editor className='editor' /> */}
                </div>
                <div className='add-blog-tags'>
                    <h4>Add Tags</h4>
                    <MultipleSelectDropdown className='tags-select' />
                </div>
                <div className='add-blog-submit'>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </>
    );
}

export default AddBlog;