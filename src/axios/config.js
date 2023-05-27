import axios from "axios";

const cardapioFetch = axios.create({
    baseURL: "/api",
});

export default cardapioFetch;