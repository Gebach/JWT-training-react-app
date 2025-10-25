import { useContext, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const { store } = useContext(Context)

  return (
    <div>
      <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />

      {hasAccount ? (
        <>
          <button onClick={() => store.login(email, password)}>Логин</button>{' '}
          <p>
            Еще нет аккаунта?{' '}
            <span
              onClick={() => setHasAccount(false)}
              style={{ color: 'midnightblue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Зарегистрироваться
            </span>
          </p>
        </>
      ) : (
        <>
          <button onClick={() => store.registration(email, password)}>Зарегистрироваться</button>{' '}
          <p>
            Уже есть аккаунт?{' '}
            <span
              onClick={() => setHasAccount(true)}
              style={{ color: 'midnightblue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Войти
            </span>
          </p>
        </>
      )}
    </div>
  )
}

export default observer(LoginForm)
