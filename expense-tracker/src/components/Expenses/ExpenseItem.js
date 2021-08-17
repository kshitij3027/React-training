import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import Card from '../Ui/Card'
const ExpenseItem = ({expense}) => {

    return (
        <li>
        <Card className="expense-item">
            <ExpenseDate date={expense.date}/>
            <div className="expense-item__description" >
                <h2>{expense.title}</h2></div>
            <div className="expense-item__price">${expense.amount}</div>
        </Card>
        </li>
    )
}

export default ExpenseItem
