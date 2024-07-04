import { useContext } from "react"
import MainContext from "../context/MainContext"

export const useMain=()=>{
    return useContext(MainContext);
};
