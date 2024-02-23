import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function HomePage() {

    const [countries, setCountries] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
      try {
          const response = await axios.get("https://ih-countries-api.herokuapp.com/countries");
          console.log(response);
          setCountries(response.data)
          setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(true)
      }
    }

    useEffect(() => {
      getData()
    }, [])

    if (isLoading) {
      return <ClipLoader color={"#d63636"}/>
    }

    return (
        <div className="container" style={{maxHeight: "90vh", overflow: "scroll"}}>
        <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>

        <div className="list-group">
          {countries.map(eachCountry => {
            return <Link key={eachCountry._id} className="list-group-item list-group-item-action" to={`/${eachCountry.alpha3Code}`}>
             <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt={"flag"}/>
             <p>{eachCountry.name.common}</p>
            </Link>
          })}
          
        </div>
      </div>
    )
}

export default HomePage;
