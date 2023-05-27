import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { useNavigate, useParams } from "react-router-dom";
import cardapioFetch from "../axios/config";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [name, setNome] = useState("");
  const [descriptor, setDescricao] = useState("");
  const [price, setPreco] = useState("");
  const [file, setData] = useState(null);

  const getPost = async () => {
    try {
      const response = await cardapioFetch.get(`/food/${id}`);
      const data = response.data;
      setPost(data);
      setNome(data.name);
      setDescricao(data.descriptor);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        name: name || post.name,
        descriptor: descriptor || post.descriptor,
        price: price || post.price,
      };

      await cardapioFetch.put(`/food/${id}`, updatedPost);

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await cardapioFetch.put(`/food/foto/${id}`, formData);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="new-comida">
      <h2>Editar comida:</h2>
      <form onSubmit={handleEdit}>
        <div className="form-control">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder={post.name}
            value={name}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="descricao">Descrição:</label>
          <input
            name="descricao"
            id="descricao"
            placeholder={post.descriptor}
            value={descriptor}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="preco">Preco:</label>
          <input
            type="number"
            name="preco"
            id="preco"
            placeholder="Digite o preco:"
            value={price}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="arquivo">Imagem:</label>
          <input
            type="file"
            name="arquivo"
            id="arquivo"
            placeholder="Selecione a imagem:"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setData(e.target.files[0])}
          />
        </div>
        <input type="submit" value="Editar" className="btn" />
      </form>
    </div>
  );
};

export default Edit;
