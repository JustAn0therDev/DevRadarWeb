import React, { useEffect, useState } from 'react';
import './styles.css';

export default function DevForm({ onSubmit }) {

    let [github_username, setGitHubUsername] = useState('');
  
    let [techs, setTechs] = useState('');
  
    let [lat, setLatitude] = useState('');
    
    let [long, setLongitude] = useState('');

    useEffect(
        () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude);
              setLongitude(longitude);
          }, (err) => {
            console.log(err);
          }, {
            timeout: 30000,
          });
    
        }, []); //um array vazio e passado para indicar que a funcao sera executada uma unica vez.

        async function handleSubmit(e) {
            e.preventDefault();
            await onSubmit({
                github_username,
                techs,
                latitude: lat,
                longitude: long
            });

            setGitHubUsername('');
            setTechs('');
        }

    return (
        <form onSubmit={handleSubmit}>
        <div className="input-block">
        <label htmlFor="github_username">Usuario no GitHub</label>
          <input
           name="github_username"
           id="github_username" 
           placeholder="Insira seu usuario no github"
           defaultValue={github_username}
           required
           onChange={ev => setGitHubUsername(ev.target.value)}
           >
           </input>
        </div>
        <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
          <input
           name="techs"
           id="techs" 
           placeholder="tecnologias"
           value={techs}
           required
           onChange={ev => setTechs(ev.target.value)}
           >
           </input>
        </div>
        <div className="input-group">
          <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
           type="number"
           name="latitude"
           id="latitude" 
           placeholder="latitude"
           value={lat}
           required
           onChange={ev => setLatitude(ev.target.value)}
           >
           </input>
          </div>
          <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
           type="number"
           name="longitude"
           id="longitude" 
           placeholder="longitude"
           value={long}
           required
           onChange={ev => setLongitude(ev.target.value)}
           >
           </input>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>Cadastrar</button>
      </form>
    )
}