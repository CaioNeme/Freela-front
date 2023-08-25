import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Header from "../components/Header";


export default function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });


  function handleChange(event) {
    const newRegister = { ...register };
    newRegister[event.target.name] = event.target.value;
    setRegister(newRegister);
  }
  console.log(register)

  return (
    <Size>
      <Header />
      <Form onSubmit={event => {
        event.preventDefault();
        setLoading(true);
        if (register.password !== register.confirmPassword) {
          alert("As senhas são diferentes");
          return
        }
        let post = register;
        const URLPostRegister = `${import.meta.env.VITE_API_URL}/signup`
        const promise = axios.post(URLPostRegister, post);
        promise.then(() => {
          setLoading(false);
          navigate("/login")
        });
        promise.catch(erro => {
          setLoading(false);
          setRegister({
            name: "",
            email: "",
            cpf: "",
            password: "",
            confirmPassword: "",
            phone: ""
          });
          alert(erro.response.data.message);
        })
      }}>
        {loading === true ? <input disabled required onChange={handleChange} value={register.name} name="name" placeholder="Nome" type="text" /> : <input required onChange={handleChange} value={register.name} name="name" placeholder="Nome" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={register.email} name="email" placeholder="E-mail" type="email" /> : <input required onChange={handleChange} value={register.email} name="email" placeholder="E-mail" type="email" />}
        {loading === true ? <input disabled required onChange={handleChange} value={register.cpf} name="cpf" placeholder="CPF" type="text" /> : <input required onChange={handleChange} value={register.cpf} name="cpf" placeholder="CPF" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={register.phone} name="phone" placeholder="Celular" type="text" /> : <input required onChange={handleChange} value={register.phone} name="phone" placeholder="Celular" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={register.password} name="password" placeholder="Senha" type="password" /> : <input required onChange={handleChange} value={register.password} name="password" placeholder="Senha" type="password" />}
        {loading === true ? <input disabled required onChange={handleChange} value={register.confirmPassword} name="confirmPassword" placeholder="Confirme a senha" type="password" /> : <input required onChange={handleChange} value={register.confirmPassword} name="confirmPassword" placeholder="Confirme a senha" type="password" />}

        {loading === false ? <button >Cadastrar</button> :
          <button disabled>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </button>}
      </Form>
      <Link to={"/login"}>
        <LogIn ><p>Já tem uma conta? Faça o login!</p></LogIn>
      </Link>
    </Size>
  );
}

const Size = styled.div`
  width:auto;
  background-color:#FFF;
`;
const Form = styled.form`  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  margin-top:33px;

  input{
    cursor: pointer;

    box-sizing:border-box;

    width: 100vh;
    height: 45px;

    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    margin:15px;

    color: #000;
  }
  button{
    appearance:none;
    border-width: none;
    border-style: none;
    border-color: none;
    border-image: none;
    display:flex;
    justify-content:center;
    align-items:center;

    :hover{
      color:#0FF;
    }

    cursor: pointer;

    width: 100vh;
    height: 45px;

    margin:15px;

    background: #000;
    border-radius: 5px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;

  }
`;
const LogIn = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;

  margin-top:25px;

  cursor: pointer;

  p{
    width: 100vh;
    height: 17px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;

    color: #000;
  }
`