import './App.css';
import Header from './MyComponents/Header';
import {Footer} from "./MyComponents/Footer";
//import Todo from "./MyComponents/Todo";
import {Todos} from "./MyComponents/Todos";
import {AddTodo} from "./MyComponents/AddTodo";
import React, { useState,useEffect } from 'react';
function App() {
  let initTodo
  if(localStorage.getItem("todos")===null){
    initTodo =[]
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }
 
  const onDelete = (todo)=>{
    console.log("I am onDelete todo", todo);
    setTodos(todos.filter((e)=>{
        return e!==todo
    }))
    localStorage.getItem("todos")
  }
  const addTodo = (title,desc)=>{
    console.log("I am adding todo",title,desc)
    let sno;
    todos.length===0? sno = 0: sno = todos[todos.length - 1].sno + 1
    if(sno != 0){
    const myTodo = {
      sno: sno,
      title: title,
      desc:desc
    }
    setTodos([...todos,myTodo])
    console.log(myTodo)
  }


    if(localStorage.getItem("todos")){
      localStorage.setItem("todos",JSON.stringify(todos))
    }
  }
  const [todos, setTodos] = useState([initTodo]);
  useEffect(() => {
    initTodo = JSON.parse(localStorage.getItem("todos"))
  
  }, [todos])
  return (
    <>
    <Header title="My Todos List"/>
    <AddTodo addTodo = {addTodo}/>
    <Todos todos = {todos} onDelete={onDelete}/>
    <Footer/>
    </>
  );
}

export default App;
