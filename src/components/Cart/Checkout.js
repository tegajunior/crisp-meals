import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetnputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
    email: true,
    phone: true,
  });

  const isEmpty = (value) => value.trim() === '';
  const isNotUptoFiveChars = (value) => value.trim().length !== 5;
  const isInvalidEmail = (value) => !value.includes('@') && value.trim() !== '';

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetnputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isNotUptoFiveChars(enteredPostal);
    const enteredEmailIsValid = !isInvalidEmail(enteredEmail);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
      email: enteredEmailIsValid,
      phone: enteredPhoneIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredEmailIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      email: enteredEmail,
      city: enteredCity,
      phone: enteredPhone
    });
  };
  const nameInputClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    formInputsValidity.postal ? '' : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  const emailInputClasses = `${classes.control} ${
    formInputsValidity.email ? '' : classes.invalid
  }`;

  const phoneInputClasses = `${classes.control} ${
    formInputsValidity.phone ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Your name is required</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} />
        {!formInputsValidity.email && <p>Your email address is required</p>}
      </div>
      <div className={phoneInputClasses}>
        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" placeholder="(+1)" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Your phone number is required</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetnputRef} />
        {!formInputsValidity.street && <p>Your street is required</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Your postal code must be five chars long</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Your city is required</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
