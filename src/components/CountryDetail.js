import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from '../api/country';
import '../Css/CountryDetail.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CountryDetail = () => {
  const [country, setCountry] = useState([]);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const countryParam = useParams();

  useEffect(() => {
    setLoading(true);
    const getDetails = async () => {
      const response = await axios.get(
        `/name/${countryParam.name}?fields=name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;flag;borders`
      );
      const data = response.data;
      const borderArray = [...data[0].borders];
      let border = [];
      for (const bord of borderArray) {
        const borderdata = await axios.get(`/alpha/${bord}?fields=name`);
        border.push(borderdata.data);
      }

      setLoading(false);
      setCountry(data);
      setBorders(border);
    };
    getDetails().catch((err) => console.log(err.message));
  }, [countryParam.name]);

  const renderedCountryDetail = country.map((item, index) => {
    return (
      <div key={index} className="countrydetail__details">
        <div className="countrydetail__flag">
          <img src={item.flag} alt="flag" />
        </div>
        <div className="countrydetail__info">
          <p className="countrydetail__name">{item.name}</p>
          <p>
            <span>Native Name: </span>
            {item.nativeName}
          </p>
          <p>
            <span>Population: </span>
            {item.population}
          </p>
          <p>
            <span>Region: </span>
            {item.region}
          </p>
          <p>
            <span>Sub-Region: </span>
            {item.subregion}
          </p>
          <p>
            <span>Capital: </span>
            {item.capital}
          </p>
          <p>
            <span>Top-Level Domain: </span>
            {item.topLevelDomain}
          </p>
          <p>
            <span>Currencies: </span>
            {item.currencies.map((cur) => cur.name + '')}
          </p>
          <p>
            <span>Languages: </span>
            {item.languages.map((lang) => lang.name + ' ')}
          </p>
          <p className="countrydetail__border">
            <span>Border Countries: </span>
          </p>
          {borders.map((bord, i) => {
            return (
              <button key={i} className="countrydetail__btn">
                {bord.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  });

  const classes = useStyles();
  return (
    <div className="countrydetail">
      {loading && <p>Loading</p>}
      {!loading && (
        <div className={classes.root}>
          <Link to="/country">
            <Button variant="contained">Back</Button>
          </Link>
        </div>
      )}
      {renderedCountryDetail}
    </div>
  );
};

export default CountryDetail;
