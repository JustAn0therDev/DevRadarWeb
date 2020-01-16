import React from 'react';

export default function DevItem({ dev }) {
    return (
        <li className="dev-item" >
        <header>
          <img src={dev.avatar_url} alt={!dev.name ? "Foto de perfil do GitHub" : dev.name}/>
          <div className="user-info">
            <strong>{!dev.name ? "Sem nome definido" : dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </header>
        <p>{!dev.biography ? "Este usuario do github nao possui biografia." : dev.biography}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
      </li>
    )
}