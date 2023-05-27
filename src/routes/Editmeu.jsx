import cardapioFetch from "../axios/config";
import { useEffect, useState  } from "react";
import "./NewPost.css";
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {
    const irPara = useNavigate();
    const [posts, setPosts] = useState([])
    const {id} = useParams();
    const [name=posts.name, setNome] = useState()
    const [descriptor=posts.descriptor, setDescricao] = useState()
    const [price, setPreco] = useState("")
    const [file=0, setData] = useState()

    const getPosts = async() => {
        try{
            const response = await cardapioFetch.get(`/food/${id}`);
            const data = response.data;
            setPosts(data);
        }catch (error){
            console.log(error)
        }
    };

    const createEdit = async(e) =>{
        e.preventDefault();
        try{
            const post = {name, descriptor, price};
            if (post.price == ""){
                post.price = posts.price;
            }
            const arquivo = new FormData();
            arquivo.append("file", file)
            await cardapioFetch.put(`/food/${id}`,post);
            if (file == 0 ){
                irPara("/")
            }else{
            await cardapioFetch.put(`/food/foto/${id}`, arquivo);
            irPara("/")}
        }catch(error){
            console.log(error)
        }
    };
    useEffect(() => {
        getPosts();
    }, []);
    
    return (
    <div className="new-comida">
        <h2>Editar comida:</h2>
        <form onSubmit={createEdit}>
            <div className="form-control">
                <label htmlFor="nome">Nome:
                <input
                   type="text"
                   name="title"
                   id="title"
                   
                   placeholder={`${posts.name}`}
                   onChange={(e) => setNome(e.target.value)}
                   />
                   </label>
            </div>
            <div className="form-control">
                <label htmlFor="descricao">Descrição:
                <input
                name="descricao"
                id="descricao"
                placeholder={`${posts.descriptor}`}
                onChange={(e) => setDescricao(e.target.value)}
                />
                </label>
            </div>
            <div className="form-control">
          <label htmlFor="preco">Preco:
          <input
            type="number"
            name="preco"
            id="preco"
            placeholder="Digite o preco:"
            
            
            onChange={(e) => setPreco(e.target.value)}
          />
          <span className="validity"></span>
          </label>
        </div>
            <div className="form-control">
                <label htmlFor="arquivo">Imagem:
                <input
                   type="file"
                   name="arquivo"
                   id="arquivo"
                   placeholder="Selecione a imagem:"
                   accept=".jpg, .jpeg, .png"
                   onChange={(e) => setData(e.target.files[0])}
                   />
                   <span className="validity"></span>
                   </label>
            </div>
            <input type="submit" value="Editar" className="btn"/>
        </form>
    </div>
  )
}

export default Edit