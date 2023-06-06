import { createContext, useState } from 'react'

const UserContext = createContext({
  userId: null,
  logado: false,
  handleLogin: () => { },
  handleLogout: () => { },
})

export function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState({ userId: null, logado: true })

  function handleLogin(email, senha) {
    setCurrentUser({ userId: 100, logado: true })
  }

  function handleLogout() {
    setCurrentUser({ userId: null, logado: false })
  }

  const contexto = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleLogout,
  }

  return (
    <UserContext.Provider value={contexto}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext