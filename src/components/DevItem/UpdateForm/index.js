import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import '../../DevItem/styles.css';

export default function UpdateForm({dev}) {

    const [githubUsername, setGithubUsername] = useState('');

    const [techs, setTechs] = useState('');

    useEffect(() => {
        setGithubUsername(dev.github_username);
            async function getTechs() {
                let response = await api.get('/devs', {
                    params: {
                        github_username: githubUsername
                    }
                });
                setTechs(response.data.devs[0].techs.join(', '));
                console.log(techs);
            }
            getTechs();
    }, []);

    async function updateTechs(techs) {
        await api.put('/devs', {
            github_username: githubUsername,
            techs
        });

        window.location.assign('/');
    }

    function cancelUpdate() {
        let allUpdateFormComponents = document.querySelectorAll('.update-form');
        setTechs('');
        allUpdateFormComponents.style.display = 'none';
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
            <button onClick={ (ev) => { ev.preventDefault(); cancelUpdate()} } className="devButton">Cancelar</button>
        </div>
    )
}