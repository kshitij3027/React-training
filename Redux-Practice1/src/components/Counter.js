import classes from './Counter.module.css';
import {useSelector, useDispatch} from 'react-redux'
import {counterActions} from '../store/index'
const Counter = () => {
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const showCounter = useSelector(state => state.counter.showCounter)
  const incrementHandler = () => {
    dispatch(counterActions.increment())
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
