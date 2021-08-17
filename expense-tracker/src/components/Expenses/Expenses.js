import "./Expenses.css";
import { useState } from "react";
import Card from "../Ui/Card";
import ExpensesFilter from "./ExpenseFilter";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "../Chart/ExpenseChart";
const Expenses = (props) => {
  const [filteredState, setFilteredState] = useState("2020");
  const ShowFilter = (filterYear) => {
    setFilteredState(filterYear);
  };
  const filterExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredState;
  });
  return (
    <Card className="expenses">
      <ExpensesFilter enteredFilter={ShowFilter} />
      <ExpenseChart expenses={filterExpenses} />
      <ExpensesList items={filterExpenses} />
    </Card>
  );
};

export default Expenses;
