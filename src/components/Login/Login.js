import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/input'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.val,
      isValid: state.value.includes('@')
    };
  }
  return {
    value: '',
    isValid: false
  };
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return { value: '', isValid: false };
}

const collegeReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 0
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 0
    }
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);



  const [emailState, emailDispatch] = useReducer(emailReducer, { value: '', isValid: null },);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, { value: '', isValid: null });


  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("validity");
  //     setFormIsValid(
  //       emailState.value && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //     );
  //   }, 500);
  //   return () => {
  //     console.log("Cleaner");
  //     clearTimeout(identifier);
  //   }
  // }, [enteredEmail, enteredPassword, enteredCollege])

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    );
  }

  const validateEmailHandler = () => {
    emailDispatch({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailState.value);
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' type='email' label='E-Mail' isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}></Input>
        <Input id='password' type='password' label='Password' isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>
        <Input id='college' type='college' label='College' isValid={collegeState.isValid} value={collegeState.value} onChange={collegeChangeHandler} onBlur={validateCollegeHandler}></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
