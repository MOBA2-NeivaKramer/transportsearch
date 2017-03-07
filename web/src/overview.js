import React, {Component} from "react";
import api from 'api';

export default class Overview extends Component {

    constructor(props) {
        super(props);
        this.findLocations();
        this.state = {locations: []};
    }

    findLocations() {
        api.findLocation(this.props.params.name).then(result => {
            this.setState({locations: result.stations});
            console.log("Var: ", this.state.locations);
        });
    }

    table() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Locations</th>
                </tr>
                </thead>
                <tbody>
                {this.state.locations.map((location, index) => {
                    return <tr>
                        <td key={index}>{location.name}</td>
                    </tr>
                })
                }
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                <h1>OVERVIEW</h1>
                {this.table()}
            </div>
        );
    }

}