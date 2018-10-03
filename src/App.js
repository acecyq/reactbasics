import React, { Component } from 'react';

// import lists and data components
import Lists from './components/lists/lists';
import Data from './components/data/data';

// import json file
import generated from './json/generated';

// import app css file
import './App.css';



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

			// data from json file
			data : {generated},
			info : {}
		}
	}

	// when a company name is clicked
	listClick = (event, index) => {
		let info = this.state.data.generated[index];
		this.setState({ info : info });
	}

  render() {
    return (
      <div className="App">
        <Lists data={this.state.data} clicked={this.listClick} />
        <Data info={this.state.info} />
      </div>
    );
  }
}

export default App;
