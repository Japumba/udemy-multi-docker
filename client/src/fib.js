import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/value/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const indexes = await axios.get('/api/value/all');
        this.setState({ seenIndexes: indexes.data });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes i have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values:</h3>
                {this.renderCalculatedValues()}
            </div>
        );
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/value', {
            index: this.state.index
        });

        this.setState({ index: '' });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ index }) => index).join(', ');
    }

    renderCalculatedValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            )
        }

        return entries;
    }


}

export default Fib;