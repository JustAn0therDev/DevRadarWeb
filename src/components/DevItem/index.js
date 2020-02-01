import React, { useState, useEffect } from 'react';

import UpdateForm from './UpdateForm/index';
import api from '../../services/api';
import './styles.css';

export default function DevItem({ dev, key }) {
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
          <button
          type="button" 
          id="btn-update-dev" 
          className="dev-button" 
          onClick={(ev) => { ev.preventDefault(); }}>Atualizar techs
          </button>
          <UpdateForm dev={dev} key={key} />
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