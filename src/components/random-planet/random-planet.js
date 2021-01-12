import React from 'react';

import './random-planet.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import Error from "../error";

export default class RandomPlanet extends React.Component{

    swapi = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onPlanetLoaded = (planet) =>{

        this.setState({
            planet,
            loading: false,
            error: false,
        })
    }

    onError = (err) =>{
        this.setState({
            error: true,
            loading:false,
        })
    }

    updatePlanet = () =>{
        const id = Math.floor(Math.random()*25) + 3;

        this.swapi.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }




    render() {
        const {planet,loading, error, src} = this.state;
        const hasData = !(loading || error)

        const errorMessage = error ? <Error/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = hasData? <PlanetView planet={planet} src={src}/> : null;

        return(
             <div className="random-planet jumbotron rounded">
                 {errorMessage}
                 {spinner}
                 {content}
             </div>

        )
    }
}

const PlanetView = ({planet}) =>{

    const {name, population, rotationPeriod, diameter, src} = planet;

    return(
        <React.Fragment>
            <img className="planet-image"
                 src={`${src}`} alt="random-planet-img"/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}