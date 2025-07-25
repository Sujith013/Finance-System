import axios from "axios"
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio"
import { handleError } from "../Helpers/ErrorHandler";

const api = `${process.env.REACT_APP_BACKEND_URL}/api/portfolio/`

export const portfolioAddAPI = async (symbol:string) => {
    try{
        const token = localStorage.getItem("token");
        
        const data = await axios.post<PortfolioPost>(api+`?symbol=${symbol}`,{}, { 
            headers: { Authorization: `Bearer ${token}` 
        }});
        return data;
    }catch(error)
    {
        handleError(error);
    }
}

export const portfolioDeleteAPI = async (symbol:string) => {
    try{
        const token = localStorage.getItem("token");
        
        const data = await axios.delete<PortfolioPost>(api+`?symbol=${symbol}`, { 
            headers: { Authorization: `Bearer ${token}` 
        }});
        return data;
    }catch(error)
    {
        handleError(error);
    }
}

export const portfolioGetAPI = async () => {
    try{
        const token = localStorage.getItem("token");
        
        const data = await axios.get<PortfolioGet[]>(api, { 
            headers: { Authorization: `Bearer ${token}` 
        }});
        return data;
    }catch(error)
    {
        handleError(error);
    }
}