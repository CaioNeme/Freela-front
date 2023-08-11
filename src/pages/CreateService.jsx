import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'


export default function CreateService() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserDataContext);
  const [service, setService] = useState({
    title: "",
    subTitle: "",
    description: "",
    price: "",
    address: "",
    categoryId: "",
    rangeId: "",
    mainImage: "",
  });
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const [categories, setCategories] = useState([])
  const [range, setRange] = useState([])

  useEffect(() => {
    const category = axios.get("http://localhost:5000/categories");
    category.then(categories => {
      setCategories(categories.data)
    }).catch(err => console.log(err));

    const range = axios.get("http://localhost:5000/range");
    range.then(range => {
      setRange(range.data)
    }).catch(err => console.log(err));
  }, [])

  function handleChange(event) {
    const newService = { ...service };
    newService[event.target.name] = event.target.value;
    setService(newService);
  }

  return (
    <>
      <Header />
      <Form onSubmit={event => {
        event.preventDefault();
        setLoading(true);

        const URLPostService = "http://localhost:5000/service"
        service.price.replace(",", ".")
        service.price = service.price * 100
        const promise = axios.post(URLPostService, service, config);
        promise.then(() => {
          setLoading(false);
          navigate("/")
        });
        promise.catch(erro => {
          setLoading(false);
          setService({
            title: "",
            subTitle: "",
            description: "",
            price: "",
            address: "",
            categoryId: "",
            rangeId: "",
            mainImage: "",
          });
          alert(erro.response.data.message);
        })
      }}>
        {loading === true ? <input disabled required onChange={handleChange} value={service.title} name="title" placeholder="Nome Do Serviço" type="text" /> : <input required onChange={handleChange} value={service.title} name="title" placeholder="Nome Do Serviço" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={service.subTitle} name="subTitle" placeholder="Sub-Titulo" type="text" /> : <input required onChange={handleChange} value={service.subTitle} name="subTitle" placeholder="Sub-Titulo" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={service.description} name="description" placeholder="Descrição" type="text" /> : <input required onChange={handleChange} value={service.description} name="description" placeholder="Descrição" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={service.price} name="price" placeholder="Preço" type="number" /> : <input required onChange={handleChange} value={service.price} name="price" placeholder="Preço" type="number" />}
        {loading === true ? <input disabled required onChange={handleChange} value={service.address} name="address" placeholder="Endereço" type="text" /> : <input required onChange={handleChange} value={service.address} name="address" placeholder="Endereço" type="text" />}
        {loading === true ? <input disabled required onChange={handleChange} value={service.mainImage} name="mainImage" placeholder="Imagem" type="url" /> : <input required onChange={handleChange} value={service.mainImage} name="mainImage" placeholder="Imagem" type="url" />}
        <div>
          {loading === true ? <Select options={categories} disabled required onChange={handleChange} value={service.categoryId} name="categoryId" placeholder="Categoria" type="text" /> : <Select options={categories} onChange={(selectedOption) => setService({ ...service, categoryId: selectedOption.value })} value={categories.find((cat) => cat.value === service.categoryId)} placeholder="Categoria" />}
          {loading === true ? <Select options={range} disabled required onChange={handleChange} value={service.rangeId} name="rangeId" placeholder="Alacance" type="text" /> : <Select options={range} onChange={(selectedOption) => setService({ ...service, rangeId: selectedOption.value })} value={range.find((cat) => cat.value === service.rangeId)} placeholder="Alcance" />}
        </div>
        {loading === false ? <button >Criar</button> :
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

    </>
  )
}
const Form = styled.form`  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  margin-top:33px;

  input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
  }
  input[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;
  }
  div{
    display:flex;
    cursor: pointer;

    input{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;

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

    div{
      margin:15px;
      div{
        margin:auto;
        div:last-child {
          display:block;
        }
      }
    }
  }

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