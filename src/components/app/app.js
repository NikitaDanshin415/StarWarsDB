import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import Error from "../error";


import './app.css';
import SwapiService from "../../services/swapi-service";
import ItemDetails from "../item-details";
import Row from "../Row";
import Record from "../Record";
import ItemList from '../item-list';

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

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={this.swapi.getPerson}
                getImageUrl={this.swapi.getPersonImage}>
                    <Record field='gender' label='Gender'/>
                    <Record field='eyeColor' label='Eye color'/>
            </ItemDetails>

                );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={this.swapi.getStarShip}
                getImageUrl={this.swapi.getStarshipImage}>
                    <Record field='model' label='Model'/>
                    <Record field='length' label='Length'/>
                    <Record field='costInCredits' label='Cost'/>
            </ItemDetails>
        );

        return(
            <div>
                <Header />
                <ItemList
                    getData={this.swapi.getAllPeople}
                    onItemSelected={() => {}}>

                    { ({name}) => <span>{name}</span> }
                </ItemList>

                <ItemList
                    getData={this.swapi.getAllPlanets}
                    onItemSelected={() => {}}>

                    { ({name}) => <span>{name}</span> }
                </ItemList>

                {/*<Row*/}
                {/*    left={personDetails}*/}
                {/*    right={starshipDetails}/>*/}
            </div>
            )

    }
};