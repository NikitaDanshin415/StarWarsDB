import React from 'react';

import './item-list.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import Error from "../error";

export default class ItemList extends React.Component{

    state = {
        itemList: null,
        hasError: false,
    };

    componentDidMount() {
        const {getData} = this.props

        getData()
            .then((itemList)=>{
                this.setState({
                    itemList: itemList,
                });
            });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
        })
    }


    renderItems(arr) {
        return arr.map(({id, name})=>{
            return(
                <li className="list-group-item"
                    key = {id}
                    onClick={()=> this.props.onItemSelected(id)}>
                    {name}
                </li>
                )
        });
    }

    render() {
        const {itemList} = this.state;

        if(this.state.hasError){
            return <Error/>
        }

        if(!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList)
        return(
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}