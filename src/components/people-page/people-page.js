import {Component} from 'react';
import React from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import Error from "../error";
import SwapiService from "../../services/swapi-service";
import Row from "../Row";
import ErrorBoundry from "../ErrorBoundry";



export default class PeoplePage extends Component{

    swapi= new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false,
    }

    onPersonSelected = (id) =>{
        this.setState({
            selectedPerson:id
        })
    }



    render(){
        if(this.state.hasError){
            return <Error/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapi.getAllPeople}>
                {(item)=>(
                    `${item.name} (${item.birthDate})`
                )}
            </ItemList>
        );

        const personDetails = (
            <ItemDetails itemId={this.state.selectedPerson}/>
        );

        return(
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        )
    }
}