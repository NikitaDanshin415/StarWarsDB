import React from 'react';

import './item-details.css'
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";
import Error from "../error";

export default class ItemDetails extends React.Component{

    state = {
        item: null,
        hasError:false,
    }

    swapi = new SwapiService();

    updateItem = () =>{
        const {itemId} = this.props

        if(!itemId){
            return;
        }

        this.swapi
            .getPerson(itemId)
            .then((item)=>{
                this.setState({
                    item: item,
                })
            })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
        })
    }

    componentDidMount() {
        this.updateItem();
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem()
            this.setState({
                hasError: false,
            })
        }
    }

    render() {

        if(this.state.hasError){
            return <Error/>
        }

        if(!this.state.item){
            return <span>Select a item from a list</span>
        }

        const {item : {birthDate, eyeColor, gender, id, name}} = this.state

        return(
            <div className="item-details card">
                <img className="item-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="item-img"/>

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