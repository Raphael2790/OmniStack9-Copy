import React, { useEffect, useState}from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

import api from '../../services/api';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: {user_id}
      })
      setSpots(response.data);
    }
    loadSpots();
  }, []);


  return (
    <>
    <ul className="spot-list">
      {spots.map(spot => 
      (
        <li key={spot._id}>
          <header>
            <img src={spot.thumbnail_url} alt="Spot Thumbnail"/>
          </header>  
          <strong>{spot.company}</strong>
          <span>{spot.price?`R$${spot.price}/dia`:'Gratuito'}</span>
          {spot.techs.map((tech, index) => (
            <p key={index} >{tech}</p>
          ))}
        </li>
      ))}
    </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  )
}
