import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

export default function Cadastrarform(props) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { handleSignup } = useContext(UserContext)
  const [errorSignup, setErrorSignup] = useState("")

  const validaEmail = {
    required: {
      value: true,
      message: 'Email é obrigatório',
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Email inválido',
    }
  }

  const validaSenha = {
    required: {
      value: true,
      message: 'Senha é obrigatória',
    },
    minLength: {
      value: 8,
      message: 'Senha deve ter no mínimo 8 caracteres',
    }
  }

  async function onSubmit(data) {
    const { email, senha } = data;
    setErrorSignup("")
    try {
      await handleSignup(email, senha)
      navigate("/")
    } catch (error) {
      setErrorSignup(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorSignup && <p className="erro">{errorSignup}</p>}
      <div className="input-container ic1">
        <input type="email" id="email" {...register("email", validaEmail)} className="input" placeholder='Email' />
        {errors.email && <p className="erro">{errors.email.message}</p>}
      </div>
      <div className="input-container ic1">
        <input type="password" id="senha" {...register("senha", validaSenha)} className="input" placeholder='Senha' />
        {errors.senha && <p className="erro">{errors.senha.message}</p>}
      </div>
      <button type="submit" className="submit">Cadastrar</button>
    </form>
  )
}
