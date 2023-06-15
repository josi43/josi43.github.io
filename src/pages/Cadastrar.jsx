import './Login.css'
import { Caixa } from "../components/Caixa"
import { Main } from "../components/Main"
import { Logo } from "../components/Logo"
import { Forgot } from "../components/Forget"
import { NavLink, useNavigate } from "react-router-dom"
import CadastrarForm from "./CadastrarForm"


export default function Cadastrar() {
  return (
    <Main>
    <section className="form-login">
      <Caixa>
        <Logo msg='centro'/>
        <h2>Cadastrar</h2>
      <CadastrarForm />
      <Forgot msg ='Ja tenho cadastro'/>
      </Caixa>
    </section>
    </Main>
  )
}