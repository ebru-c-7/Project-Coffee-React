import axios from "axios";

const instance = axios.create({
    baseURL: 'https://project-coffee-react.firebaseio.com/'
});

export default instance;