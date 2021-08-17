import React from 'react'
import { useState } from 'react';
export const AddTodo = (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    return (
        <div className="container my-3">
            <h3 className="text-center">Add a Todo</h3>
         <form>
  <div className="mb-3">
    <label htmfor="title" className="form-label">Todo Title</label>
    <input type="text" value = {title} onChange = {(e)=>{setTitle(e.target.value)}} className="form-control" id="title"  />

  </div>
  <div className="mb-3">
    <label htmfor="desc" className="form-label">Todo Description</label>
    <input type="text" value = {desc} onChange = {(e)=>{setDesc(e.target.value)}} className="form-control" id="desc" />
  </div>
  
  <button type="submit" className="btn btn-success" onClick = {(e)=>{
        e.preventDefault();
        if(!title || !desc){
            alert("Title or Description cannot be blank");
        }
        props.addTodo(title,desc)
    }}>Add Todo</button>
</form>   
        </div>
    )
}
