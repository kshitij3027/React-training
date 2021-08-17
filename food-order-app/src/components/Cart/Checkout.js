  import {useRef,useState} from 'react'
import classes from './Checkout.module.css';
const isEmpty = (value) => value.trim() !== '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = (props) => {
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputsValidity,setformInputsValidity] = useState({
        name:true,
        street: true,
        postalCode: true,
        city: true
    })
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value


    const enteredNameisValid = isEmpty(enteredName)
    const enteredStreetisValid = isEmpty(enteredStreet)
    const enteredCityisValid = isEmpty(enteredCity)
    const enteredPostalCodeisValid = isFiveChars(enteredPostalCode)

    setformInputsValidity({
        name: enteredNameisValid,
        street: enteredStreetisValid,
        postalCode: enteredPostalCodeisValid,
        city: enteredCityisValid
    })

    const formisValid = enteredNameisValid && enteredStreetisValid && enteredCityisValid && enteredPostalCodeisValid



    if(!formisValid){
        return;
    }

    //Submit cart Data
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalCode:enteredPostalCode,
        city:enteredCity
    })
  };


  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please Enter a Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please Enter a Valid Street Name</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please Enter a Valid 5 digit Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please Enter a Valid City Name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;