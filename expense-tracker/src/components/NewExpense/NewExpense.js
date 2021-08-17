import ExpenseForm from './ExpenseForm'
import { useState } from 'react'
import './NewExpense.css'
const NewExpense = (props) => {
    const [onCancel, setOnCancel] = useState(false)
    const Cancel = () =>{
        setOnCancel(true)
    }
    const Reset = () =>{
        setOnCancel(false)
    }
    if(onCancel){
        return <div className="new-expense"><ExpenseForm onAddExpense={props.onAddExpense} reset={Reset}/></div>
    }

    return (
        <div className="new-expense">
            <button type="button" onClick={Cancel}>Add New Expense</button>
        </div>
        
    )
}

export default NewExpense
