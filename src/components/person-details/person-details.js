import React from 'react';

import './person-details.css'
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";
import Error from "../error";

export default class PersonDetails extends React.Component{

    state = {
        person: null,
        hasError:false,
    }

    swapi = new SwapiService();

    updatePerson = () =>{
        const {personId} = this.props

        if(!personId){
            return;
        }

        this.swapi
            .getPerson(personId)
            .then((person)=>{
                this.setState({
                    person: person,
                })
            })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
        })
    }

    componentDidMount() {
        this.updatePerson();
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.personId !== prevProps.personId){
            this.updatePerson()
            this.setState({
                hasError: false,
            })
        }
    }

    render() {

        if(this.state.hasError){
            return <Error/>
        }

        if(!this.state.person){
            return <span>Select a person from a list</span>
        }

        const {person : {birthDate, eyeColor, gender, id, name}} = this.state

        return(
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="person-img"/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthDate}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                        <li className="list-group-item">
                           <ErrorButton/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}