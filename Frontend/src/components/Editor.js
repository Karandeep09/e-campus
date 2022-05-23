import React, { Component } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/intellij-light.css';
import ReactQuill from "react-quill";

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('please copy paste the image url here.');
  if(value){
      this.quill.insertEmbed(range.index, 'image', value);
      // this.quill.insertText("♥");
  }
}
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "<div contenteditable='false'>Your text here</div>"
    };
  }

  modules = {
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },   
    toolbar: {

      container: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "code-block"],
                 ],
                 handlers:{
                   image : imageHandler
                 }
      }
  };
   
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block"
  ];
  handleProcedureContentChange = (content, delta, source, editor) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };

  render() {
    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={this.state.text}
        onChange={this.handleProcedureContentChange}
      >
        <div className="my-editing-area" />
      </ReactQuill>
    );
  }
}

export default Editor;