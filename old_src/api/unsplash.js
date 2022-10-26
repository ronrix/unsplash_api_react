import Axios from 'axios';

const PUBLIC_KEY = "BG7AFg5JhyoukLvguMUGJDTH2ET_K5U4f1-ug-Hs8Ms"

export default Axios.create({
	baseURL: "https://api.unsplash.com/",
	headers: {"Authorization": `Client-ID ${PUBLIC_KEY}`}
});