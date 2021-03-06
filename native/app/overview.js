import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, ListView, Text, TouchableHighlight} from 'react-native';
import api from 'api';

export default class Overview extends Component {
    static navigationOptions = {
        title: 'Overview',
    };

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            stations: [],
            dataSource: ds.cloneWithRows([])
        };

        api.findLocation(params.location).then(result => {
            this.setState({
                stations: result.stations,
                dataSource: ds.cloneWithRows(result.stations)});
        });
    }

    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }

    renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <TouchableHighlight onPress={() => { this.pressRow(sectionID, rowID); highlightRow(sectionID, rowID); } }>
                <View style={{height: 30}}>
                    <Text>{rowData.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    pressRow(sectionID, rowID) {
        const location = this.state.stations[rowID]
        this.props.navigation.navigate('Stationboard', { location })
    }
}