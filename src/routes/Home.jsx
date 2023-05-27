import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import cardapioFetch from "../axios/config";


const MenuItem = ({ post }) => (
  
  <div className="post" key={post.id}>
    <h2>{post.name}</h2>
    <div className="imagem">
      <img src={'data:' + post.type + ';base64,' + post.data} alt={post.name} />
    </div>
    <p>{post.descriptor}</p>
    <p>R$ {post.price.toFixed(2)}</p>
    <ul>
      <li>
        <Link to={{ pathname: `/edit/${post.id}` }} className="btn">Editar</Link>
      </li>
      <li>
        <Link to={{ pathname: `/delete/${post.id}` }} className="btn">Apagar</Link>
      </li>
    </ul>
  </div>
);

const Home =  () => {
 
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const comidas = posts.filter((comida) => comida.name.toLowerCase().includes(search));
  
  const getPosts =  () => {
      cardapioFetch.get("/food/retornatudo")
      .then ((response) =>{
      const data = response.data;
      setPosts(data);})
      .catch ((error) =>{
      console.log(error);
      })
  };
  console.log("passei aqui ")
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="busca">
      <label className="labelBuscar" htmlFor="nome"> Busca :  
    <input className="inp"
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    /></label>
         <div className="card-grid">
   
          {posts.length === 0 ? (
           <p>Carregando...</p>
            ) : (
             comidas.map((post) => <MenuItem key={post.id} post={post} />)
            )}
         </div>
    </div>
  );
};

export default Home;
