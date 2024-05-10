import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/auth/operations';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setShowMessage(true);
      return;
    }

    dispatch(register({ name, email, password }));

    setName('');
    setEmail('');
    setPassword('');
    setShowMessage(false);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {showMessage && <p className={css.error}>Please fill in all fields!</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
