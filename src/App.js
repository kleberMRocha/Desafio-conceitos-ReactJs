import React,{useEffect,useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

    const [repositories,setRepositories] = useState([]);
    
    useEffect(()=>{
        api.get('repositories')
        .then(res => setRepositories(res.data))
    },[])

  async function handleAddRepository() {
 
    const response = await api.post('repositories',
        {
            "title":"ReactJs Conceitos",
            "url":"https://github.com/kleberMRocha/Desafio-conceitos-nodejs",
            "techs":["nodeJs","express"],
        }
    );

    setRepositories([...repositories,response.data]);

  }

  async function handleRemoveRepository(id) {
      api.delete(`repositories/${id}`)
      
      setRepositories(repositories.filter(repository => repository.id != id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(item => {
           return ( <li key={item.id}>
             {item.title}
  
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>)
       })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;