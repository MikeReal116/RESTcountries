import React from 'react';
import '../Css/Country.css';

const Country = ({ name, population, region, capital, flag }) => {
  return (
    <div className="country">
      <div className="country__flag">
        <img src={flag} alt="flag" />
      </div>
      <div className="country__detail">
        <p className="country__name">{name}</p>
        <p className="country__population">
          <span>Population: </span>
          {` ${population}`}
        </p>
        <p className="country__region">
          <span>Region: </span>
          {` ${region}`}
        </p>
        <p className="country__capital">
          <span>Capital: </span> {` ${capital}`}
        </p>
      </div>
    </div>
  );
};

export default Country;
