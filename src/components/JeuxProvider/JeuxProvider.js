import { useEffect, useState } from "react";
import { JeuxContext } from "../../context/JeuxContext"
import { JeuxContext } from "../../context/JeuxContext";


export default function JeuxContextProvider({ children }) {
    const [jeux, setJeux] = useState([]);

    useEffect(() => {
    const fetchData = async () =>{
        try {
            const response = await fetch(`http://localhost:8000/getJeux`);
            const data = await response.json();
            setJeux(data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []);

return(
    <JeuxContext.Provider value={{jeux}}>
        {children}
    </JeuxContext.Provider>)
}