import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";
import { useAuth } from "../Context/useAuth";

const api = "http://localhost:5267/api/comment/";

export const CommentPostAPI = async (title:string,content:string,symbol:string) => {
     try {
    const token = localStorage.getItem("token");

    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title,
      content
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
} 

export const CommentGetAPI = async (symbol:string) => {
     try {
    const token = localStorage.getItem("token");

    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
} 