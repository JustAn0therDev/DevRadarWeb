import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css';
import api from "./services/api";

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

//Principais conceitos do React
//Componente/Components -- Bloco isolado de HTML, CSS e JS, o qual nao interfere no restante da aplicacao.
//Propriedade/Props -- Informacoes que um componente PAI passa para os componentes FILHOS (da mesma forma que o HTML
// recebe as propriedades na tag)
//Estado/State -- Os valores que pertencem apenas ao componente e seus filhos e sera administrados pelos mesmos.

function App() {

  let [devs, setDevs] = useState([]);

  async function handleSubmit(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data.devData]);
  }

  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
  
      setDevs(response.data.devs);
    }
    
    loadDevs();
    }, [])


  return (
    //Um "elemento vazio" dentro do React significa uma fragment. Feita para impedir a insercao de divs,
    //que atrapalhavam a estilizacao.
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
