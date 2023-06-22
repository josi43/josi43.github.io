import { createContext, useState, useEffect } from 'react'
import { login, logout, signup } from '../services/AuthService'

const UserContext = createContext({
  userId: null,
  logado: false,
  handleLogin: () => {},
  handleLogout: () => {},
  handleSignup: () => {},
})

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedLogado = localStorage.getItem('logado')
    return { userId: storedUserId, logado: storedLogado === 'true' }
  })

  useEffect(() => {
    localStorage.setItem('userId', currentUser.userId)
    localStorage.setItem('logado', currentUser.logado)
  }, [currentUser])

  async function handleLogin(email, senha) {
    try {
      const id = await login(email, senha)
      setCurrentUser({ userId: id, logado: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function handleSignup(email, senha) {
    try {
      const id = await signup(email, senha)
      setCurrentUser({ userId: id, logado: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function handleLogout() {
    await logout()
    setCurrentUser({ userId: null, logado: false })
  }

  const contexto = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleSignup,
    handleLogout,
  }

  return (
    <UserContext.Provider value={contexto}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext;
