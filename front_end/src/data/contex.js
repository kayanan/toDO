import React from "react";


const context= React.createContext(
    {Tasks:[],
    addTask:()=>{}
    }
);


export default context;