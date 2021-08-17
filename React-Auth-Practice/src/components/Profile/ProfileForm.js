import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context'
import { useRef ,useContext } from 'react';
import {useHistory} from 'react-router-dom'
const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext)
  const history = useHistory()
  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCc-f_u7BXy5ky9_JfOhIwcoiCq9iesgqg',
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        })
      }).then(res=>{
        history.replace('/')
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
