import React from 'react'
import {Todo} from "../MyComponents/Todo";
export const Todos = (props) => {
    return (
        <div className="container">
            <h3 className=" my-3">
                Todos List  
            </h3>
            {props.todos.length ==0 ? "No Todos to display" :
            props.todos.map((todo)=>{
                if(todo.title === null && props.todos.length==1){
                    <p>"No Todos to display"</p>
                }
                else {
                return <Todo todo = {todo} key = {todo.sno} onDelete = {props.onDelete}/>
                }
            })}
            
        </div>
    )
}
