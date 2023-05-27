import cardapioFetch from "../axios/config";
import { useCallback, useState } from "react";
import "./NewPost.css";
import React from 'react';
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [name, setName] = useState('');
  const [descriptor, setDescriptor] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const createPost= useCallback(async (e) => {
    e.preventDefault();
    try {
      const post = { name, descriptor, price };
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await cardapioFetch.post("/food", post);
      const idDaUltimaComidaCriada = response.data.id;
      
      await cardapioFetch.post(`/food/foto/${idDaUltimaComidaCriada}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className="new-comida">
      <h2>Cadastrar nova comida:</h2>
      <form onSubmit={createPost}>
        <div className="form-control">
          <label htmlFor="nome">Nome:
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o nome:"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="validity"></span>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="descricao">Descrição:
          <input
            name="descricao"
            id="descricao"
            placeholder="Digite a descrição"
            required
            value={descriptor}
            onChange={(e) => setDescriptor(e.target.value)}
          />
          <span className="validity"></span>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="preco">Preco:
          <input
            type="number"
            name="preco"
            id="preco"
            placeholder="Digite o preco:"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span className="validity"></span>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="preco">Imagem:
          <input
            type="file"
            name="arquivo"
            id="arquivo"
            placeholder="Selecione a imagem:"
            accept=".jpg, .jpeg, .png"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="validity"></span>
          </label>
        </div>
        <input type="submit" value="Cadastrar" className="btn" />
      </form>
    </div>
  );
}

export default NewPost;