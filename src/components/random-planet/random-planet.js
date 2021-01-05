import React from 'react';

import './random-planet.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import Error from "../error";


export default class RandomPlanet extends React.Component{


    constructor() {
        super();
        this.updatePlanet()
    }
    swapi = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
        src: 'https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png'
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

    updatePlanet(){
        const id = Math.floor(Math.random()*25)+2;

        this.swapi.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
        this._updatePicture(id);
    }

    _updatePicture(id){

        fetch(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        src: res.url,
                    })
                }else{
                    this.setState({
                        src: `https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png`,
                    })
                }

            }).catch((err)=>console.log(err))
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

const PlanetView = ({planet,src}) =>{

    const {name, population, rotationPeriod, diameter} = planet;

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