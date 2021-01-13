import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import Error from "../error";
import ErrorButton from "../error-button";

import './app.css';
import SwapiService from "../../services/swapi-service";


export default class App extends React.Component{

    swapi = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError:false,
    }


    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch(){
        this.setState({
            hasError: true,
        })
    };

    render() {

        if(this.state.hasError){
            return <Error/>
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;


        return(
            <div>
                <Header />
                {planet}

                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>

                <PeoplePage/>



            </div>
            )

    }
}