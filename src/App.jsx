import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUser()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
      <>
        <div>
          <button onClick={getUsers}>Все пользователи</button>
        </div>
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Пользователь не авторизован'}</h1>
      <h1>
        {store.user.isActivated
          ? 'Аккаунт активирован по почте'
          : `Аккаунт не активирован. Для подтверждения перейдите по ссылке в письме, отправленном на почту ${store.user.email}`}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>

      <div>
        <button onClick={getUsers}>Все пользователи</button>
      </div>

      {users.map(u => (
        <div key={u.email}>{u.email}</div>
      ))}
    </>
  )
}

export default observer(App)
