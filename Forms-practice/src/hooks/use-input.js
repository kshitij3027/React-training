import {useState} from 'react'
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [touched, setTouched] = useState(false);
  const valueisValid = validateValue(enteredValue);
  const hasError = !valueisValid && touched;
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = () => {
    setTouched(true);
  };
  const reset = () => {
      setEnteredValue('')
      setTouched(false)
  }
  return {
    value: enteredValue,
    isValid:valueisValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler, reset
  };
};
export default useInput;
