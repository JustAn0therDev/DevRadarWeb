import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function DevItem({ dev }) {
  const [techs, setTechs] = useState('');

  const [github_username, setGithubUsername] = useState('');

    useEffect(() => {
      setGithubUsername(dev.github_username);
    }, []);

    const deleteDev = async (github_username) => {
        await api.delete('/devs', {
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          data: {
            github_username
          }
        });

        window.location.assign('/');
    }

    const handleUpdateForm = async (btn) => {
      let cancelUpdateBtn = document.getElementById("btn-cancel-update-dev");
      let updateBtn = document.getElementById("btn-update-dev");
      let deleteBtn = document.getElementById("btn-delete-dev");
      let updateTechsInput = document.getElementById("input-update-dev");
      deleteBtn.style.display = "none";
      cancelUpdateBtn.style.display = "inline";
      updateTechsInput.style.display = "inline";
      
      switch (btn.textContent) {
        case 'Atualizar techs':
          btn.textContent = 'Confirmar';
          let response = await api.get('/devs', {
            params: {
              github_username
            }
          });
          updateTechsInput.value = response.data.devs[0].techs.join(', '); 
          break;
        case 'Confirmar':
          updateDev(techs);
          break;
        case 'Cancelar':           
          deleteBtn.style.display = "inline";
          updateTechsInput.style.display = "none";
          updateBtn.textContent = 'Atualizar techs';
          cancelUpdateBtn.style.display = 'none';
        break; 
        default:
          console.log(btn.textContent);
          break;
      }
    }

    const updateDev = async (techs) => {
      await api.put('/devs', {
        github_username,
        techs
      });

      window.location.assign('/');
    }

    return (
        <li className="dev-item">
        <header>
          <img src={dev.avatar_url} alt={!dev.name ? "Foto de perfil do GitHub" : dev.name}/>
          <div className="user-info">
            <strong>{!dev.name ? "Sem nome definido" : dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>
        <p>{!dev.biography ? "Este usuario nao possui biografia." : dev.biography}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        <div id="modify-buttons">
          <input 
          type="text" 
          id="input-update-dev" 
          onChange={(ev) => { ev.preventDefault(); setTechs(ev.target.value); }}  
          />
          <button
          type="button" 
          id="btn-update-dev" 
          className="dev-button" 
          onClick={(ev) => { ev.preventDefault(); handleUpdateForm(ev.target)}}>Atualizar techs
          </button>
          <button
          type="button" 
          id="btn-cancel-update-dev" 
          className="dev-button" 
          onClick={(ev) => { ev.preventDefault(); handleUpdateForm(ev.target)}}>Cancelar
          </button>
          <button 
          type="button" 
          id="btn-delete-dev" 
          className="dev-button" 
          onClick={(ev) => { ev.preventDefault(); deleteDev(dev.github_username) }}>Excluir
          </button>
        </div>
      </li>
    )
}