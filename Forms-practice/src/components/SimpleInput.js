import useInput from '../hooks/use-input'
const SimpleInput = (props) => {
  const {value: enteredName,hasError:nameInputHasError, isValid:enteredNameisValid,valueChangeHandler:nameChangeHandler,valueBlurHandler: nameBlurHandler,reset:resetNameInput} = useInput(value=>value.trim()!=='')
  const {value: enteredEmail,hasError:emailInputHasError, isValid:enteredEmailisValid,valueChangeHandler:emailChangeHandler,valueBlurHandler: emailBlurHandler,reset:resetEmailInput} = useInput(value=>value.includes('@'))

  let formIsValid = false;
  if (enteredNameisValid && enteredEmailisValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameisValid || !enteredEmailisValid) {
      return;
    }
    resetNameInput()
    resetEmailInput()
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
    const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name Input should not be empty.</p>
      )}
            <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailInputHasError && (
        <p className="error-text">Email Input should be valid.</p>
      )}

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
