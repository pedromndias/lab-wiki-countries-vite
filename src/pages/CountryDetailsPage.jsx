import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios"

function CountryDetails() {
    // console.log(useParams());
    const { countryId } = useParams();

    const [oneCountry, setOneCountry] = useState(null)
    const [countries, setCountries] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
      
      try {
        setIsLoading(true)
        const countriesResponse = await axios.get("https://ih-countries-api.herokuapp.com/countries")
        // console.log(countriesResponse.data);
        setCountries(countriesResponse.data)
        const oneCountriesResponse = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
        // console.log(oneCountriesResponse.data);
        setOneCountry(oneCountriesResponse.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(true)
      }
    }

    useEffect(() => {
      getData()
    }, [countryId])

    if(isLoading) {
      return <ClipLoader />
    }

    return (
        <div className="container">
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                Country Details
            </p>

            <h1>{oneCountry.name.common}</h1>

            <table className="table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td style={{ width: "30%" }}>Capital</td>
                        <td>{oneCountry.capital[0]}</td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>
                            {oneCountry.area} km
                            <sup>2</sup>
                        </td>
                    </tr>
                    <tr>
                        <td>Borders</td>
                        <td>
                            <ul>
                              {oneCountry.borders.map((eachBorder, index) => {
                                return <li key={index}><Link to={`/${eachBorder}`} style={{ textDecoration: 'none', marginLeft: '10px' }}>
                                  {(countries.find(el => el.alpha3Code === eachBorder)).name.common}
                                </Link></li>
                              })}
                                
                                
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CountryDetails;
