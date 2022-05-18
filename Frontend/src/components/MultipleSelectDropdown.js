import React, { useState } from 'react'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

const MultipleSelectDropdown = () => {

  const [value, setvalue] = useState('');

  const  handleOnchange  =  val  => {
    setvalue(val)
  }

  const  options  = [
    { label:  'KNIT', value:  'KNIT'  },
    { label:  'Interview', value:  'Interview'  },
    { label:  'Exams', value:  'Exams'  },
    { label:  'IT', value:  'IT'  },
  ]

  return(
    <div className="app">
      <div  className="preview-values" id='blog-tags'>
        {value}
      </div>

      <MultiSelect
        onChange={handleOnchange}
        options={options}
      />
    </div>
)}
export default MultipleSelectDropdown;

// npm i react-multiple-select-dropdown-lite
// First, to install run this

// document.querySelector('.ql-editor').innerHTML;    blog content