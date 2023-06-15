import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"

export const Forgot = (props) => {
  return (
    <a className='forgot'><NavLink to="/">{props.msg}</NavLink></a>
  )
}
