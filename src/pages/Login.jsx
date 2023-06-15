import LoginForm from "./LoginForm"
import './Login.css'
import { Caixa } from "../components/Caixa"
import { Main } from "../components/Main"
import { Logo } from "../components/Logo"
import { Forgot } from "../components/Forget"
import { NavLink, useNavigate } from "react-router-dom"



export default function Login() {
  return (
    <Main>
    <section className="form-login">
      <Caixa>
      <Logo msg='centro'/>
      <LoginForm />
      <button className="submit"><NavLink to="/cadastro">Nao tem cadastro? clique aqui!</NavLink></button>
      </Caixa>
    </section>
    </Main>
  )
}