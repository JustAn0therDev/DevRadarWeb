import React, { useState, useEffect } from 'react';

import UpdateForm from './UpdateForm/index';
import api from '../../services/api';
import './styles.css';

export default function DevItem({ dev }) {

  const [techs, setTechs] = useState('');

  const [github_username, setGithubUsername] = useState('');

    useEffect(() => {
      setGithubUsername(dev.github_username);
      setTechs(dev.techs.join(', '));
    }, [dev.github_username, dev.techs]);

    const deleteDev = async (ev, github_username) => {
        ev.preventDefault();
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

    function showUpdateForm(ev) {
      ev.preventDefault();
      let updateForm = ev.currentTarget.nextSibling;
      let updateButton = ev.currentTarget;
      let deleteButton = ev.currentTarget
      .nextSibling
      .nextSibling;

      updateForm.style.display = 'flex';
      updateForm.querySelector('input').value = techs;

      updateButton.style.display = 'none';
      deleteButton.style.display = 'none';
    }

    return (
        <li className="dev-item">
        <header>
          <img src={dev.avatar_url} alt={!dev.name ? "Foto de perfil do GitHub" : dev.name}/>
          <div className="user-info">
            <strong>{!dev.name ? "Sem nome definido" : dev.name}</strong>
            <span>{techs}</span>
          </div>
        </header>
        <p>{!dev.biography ? "Este usuario nao possui biografia." : dev.biography}</p>
        <a href={`https://github.com/${github_username}`}>Acessar perfil no GitHub</a>
        <div id="modify-buttons">
          <button
          type="button"
          className="dev-button" 
          onClick={(ev) => { showUpdateForm(ev); }}>Atualizar techs
          </button>
          <UpdateForm dev={dev} />
          <button 
          type="button" 
          className="dev-button" 
          onClick={(ev) => { deleteDev(ev, github_username) }}>Excluir
          </button>
        </div>
      </li>
    )
}