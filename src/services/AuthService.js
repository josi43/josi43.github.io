// AuthService.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from './FirebaseConfig'

const auth = getAuth(app)

export async function login(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Senha inválida')
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado')
      }
    })
}

export async function signup(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        throw new Error('Senha fraca. A senha deve ter pelo menos 6 caracteres.')
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('O endereço de e-mail já está sendo usado por outra conta.')
      } else {
        throw new Error('Ocorreu um erro ao criar a conta.')
      }
    })
}

export async function logout() {
  await signOut(auth)
}
