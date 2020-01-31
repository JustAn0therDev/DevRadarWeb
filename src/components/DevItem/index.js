import React from 'react';
import api from '../../services/api';
import './styles.css';

export default function DevItem({ dev }) {
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

        api.get('/devs');
    }

    const updateDev = async () => {

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
          <button type="button" className="dev-button">Atualizar</button>
          <button type="button" className="dev-button" onClick={(ev) => { ev.preventDefault(); deleteDev(dev.github_username) }}>Excluir</button>
        </div>
      </li>
    )
}