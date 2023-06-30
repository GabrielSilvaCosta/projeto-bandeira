import React, { useEffect, useState } from 'react';
import { getAllCountries } from './services/countriesAPI';
import './CountriesList.css';
//

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        const countriesWithFlags = data.map((country) => ({
          ...country,
          flag: country.flags.svg
        }));
        setCountries(countriesWithFlags);
      } catch (error) {
        console.error('Erro ao buscar a API:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="countries-list">
      <h2>Lista de Países</h2>
      <input
        type="text"
        placeholder="Pesquisar por bandeira..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="countries-ul">
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((country) => (
            <li key={country.name.common} className="country-item">
              <img src={country.flag} alt={`Bandeira de ${country.name.common}`} className="country-flag" />
              <span className="country-name">{country.name.common}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CountriesList;
