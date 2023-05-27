import { useEffect } from "react";
import cardapioFetch from "../axios/config";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteFood = async () => {
      try {
        await cardapioFetch.delete(`/food/${id}`);
        navigate("/");
        console.log("Passei aqui no delete")
      } catch (error) {
        console.log(error);
      }
    };

    deleteFood();
  }, [id, navigate]);

  return null; 
};

export default Delete;
