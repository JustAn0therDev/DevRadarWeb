import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import '../../DevItem/styles.css';

export default function UpdateForm({ dev }) {

    const [githubUsername, setGithubUsername] = useState('');

    const [techs, setTechs] = useState('');

    useEffect(() => {
        setGithubUsername(dev.github_username);
        setTechs(dev.techs);
    }, [dev.github_username, dev.techs]);


    async function updateTechs(techs) {
        await api.put('/devs', {
            github_username: githubUsername,
            techs
        });
        window.location.assign('/')
    }

    function cancelUpdate(ev) {
        ev.preventDefault();
        ev
        .currentTarget
        .parentElement
        .parentElement
        .querySelectorAll('button')
        .forEach(element => {
            element.style.display = 'inline-block';
        });
        ev.currentTarget.parentElement.style.display = 'none';
    }

    return(
        <div className="update-form">
            <input 
            type="text" 
            placeholder="Insira as tecnologias que você mais gosta..." 
            value={techs}
            onChange={(ev) => { ev.preventDefault(); setTechs(ev.target.value) }}
            />
            <button onClick={ (ev) => { ev.preventDefault(); updateTechs(techs) }} className="devButton">Confirmar</button>
            <button onClick={ (ev) => { cancelUpdate(ev) } } className="devButton">Cancelar</button>
        </div>
    )
}