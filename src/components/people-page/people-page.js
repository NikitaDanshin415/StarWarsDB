import {Component} from 'react';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorButton from "../error-button";
import Error from "../error";

export default class PeoplePage extends Component{

    state = {
        selectedPerson: 3,
        hasError: false,
    }

    onPersonSelected = (id) =>{
        this.setState({
            selectedPerson:id
        })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
        })
    }

    render(){
        if(this.state.hasError){
            return <Error/>
        }

        return(
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
            </div>
        )
    }
}