import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Layout.css';
import Country from './Country';
import axios from '../api/country';
import Input from './UI/Input';
import Dropdown from './UI/Dropdown';

const Layout = () => {
  const [countries, setCounties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredResult, setFilteredResult] = useState(countries);
  const [noSearchResult, setNoSearchResult] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCountry = async () => {
      const response = await axios.get(
        '/all?fields=name;capital;population;region;flag'
      );
      const data = response.data;
      setLoading(false);
      setCounties(data);
      setFilteredResult(data);
    };

    fetchCountry().catch((err) => console.log(err.message));
  }, []);

  const searchCountry = (input) => {
    const searchedcountry = countries.filter(
      (country) => country.name.toLowerCase() === input.toLowerCase()
    );
    setFilteredResult(searchedcountry);
    if (searchedcountry.length === 0) {
      return setNoSearchResult(true);
    }
    setNoSearchResult(false);
  };

  const filterByRegion = (region) => {
    if (region === 10) {
      return setFilteredResult(countries);
    }

    const filteredRegion = countries.filter(
      (country) => country.region === region
    );
    setFilteredResult(filteredRegion);
  };
  const rederCounties = filteredResult.map((country, index) => {
    return (
      <Link to={`country/${country.name}`} key={index}>
        <Country
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
          flag={country.flag}
        />
      </Link>
    );
  });

  return (
    <div className="layout">
      <div className="layout__filter">
        <Input onSearch={searchCountry} />
        <Dropdown onFilterRegion={filterByRegion} />
      </div>

      {loading && <p>Loading</p>}
      {!loading && noSearchResult && <p>No search result found</p>}
      <div className="layout__countries">
        {countries.length !== 0 && rederCounties}
      </div>
    </div>
  );
};

export default Layout;
