import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './style.css';

export default function New({ history }) {
  const [ company, setCompany ] = useState('');
  const [ techs, setTechs ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ thumbnail, setThumbnail ] = useState('');

  const preview = useMemo(() => {
    return thumbnail?URL.createObjectURL(thumbnail): null;
  } , [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault()

    const user_id = localStorage.getItem('user');
    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price)

    await api.post('/spots', data, {
      headers:{user_id}
    })

    history.push('/dashboard')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label 
        id="thumbnail"
        style={{backgroundImage:`url(${preview})`}}
        className={thumbnail?"has-thumbnail":""}
        >
          <img src={camera} alt="Imagem Thumbnail"/>
          <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        </label>

        <label htmlFor="company">EMPRESA *</label>
        <input
        type="text"
        id="company"
        onChange={event => setCompany(event.target.value)}
        value={company}
        placeholder="Sua incrivel empresa"
        />

        <label htmlFor="techs">Quais tecnologias usam? * <span>(separadas por virgula por favor)</span></label>
        <input
        type="text"
        id="techs"
        onChange={event => setTechs(event.target.value)}
        value={techs}
        placeholder="Suas tecnologias preferidas"
        />

        <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
        <input
        type="text"
        id="price"
        onChange={event => setPrice(event.target.value)}
        value={price}
        placeholder="Digite um preço amigável"
        />
        <button className="btn">Concluir cadastro</button>
      </form>
    </div>
  )
}
