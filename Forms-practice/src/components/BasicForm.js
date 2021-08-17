import useInput from "../hooks/use-input";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } =useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailNameHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);
  let formIsValid = false
  if(firstNameIsValid && lastNameIsValid && emailIsValid){
    formIsValid = true
  }

  const formSubmitHandler = event =>{
    event.preventDefault()
    if(!formIsValid){
      return;
    }
    firstNameReset()
    lastNameReset()
    emailReset()
  }
  const firstNameClasses =   firstNameHasError
  ? "form-control invalid"
  : "form-control";
  const lastNameClasses =   lastNameHasError
  ? "form-control invalid"
  : "form-control";
  const emailClasses =   emailNameHasError
  ? "form-control invalid"
  : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name" value={firstNameValue} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
        </div>
        {firstNameHasError && <p>First Name cannot be empty</p>}
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" value={lastNameValue} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} />
        </div>
        {lastNameHasError && <p>Last Name cannot be empty</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input type="text" id="name" value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
      </div>
      {emailNameHasError && <p>Email shhould be valid</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
