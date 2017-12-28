import React, { Component } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';

import Dashboard from './components/dashboard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Container>
					<Dashboard />
				</Container>
			</div>
		);
	}
}	

export default App;
