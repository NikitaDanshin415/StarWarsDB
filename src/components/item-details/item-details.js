import React from 'react';

import './item-details.css'
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";
import Error from "../error";


export default class ItemDetails extends React.Component{

    state = {
        item: null,
        hasError:false,
        image: null,
    }

    swapi = new SwapiService();

    updateItem = () =>{
        const {itemId, getData, getImageUrl } = this.props

        if(!itemId){
            return;
        }

        getData(itemId)
            .then((item)=>{
                this.setState({
                    item: item,
                    image: getImageUrl(item)
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

        const {item ,image} = this.state

        return(
            <div className="item-details card">
                <img className="item-image"
                     src={image} alt="item-img"/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child)=>{
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

