import React, { Component } from 'react';
import '../css/dashboard.css';
import { Header } from 'semantic-ui-react';
import Main from './main';
import axios from 'axios';

class Dashboard extends Component {

	constructor() {
		super();
		
		this.state = {
			avgWin: '',
			lastPlay: '',
			monthTotal: '',
			numRecords: '',
			sevenDays: '',
			total: '',
			winStreak: '',
			totalProgress: [],
			winRecord: ''
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3001/').then(data=>{
			console.log(data);
			this.setState({avgWin: data.data.avgWin[0].avgWin});
			this.setState({lastPlay: data.data.lastPlay[0]});
			this.setState({monthTotal: data.data.monthTotal});
			this.setState({numRecords: data.data.numRecords[0].numRecords});
			this.setState({sevenDays: data.data.sevenDays});
			this.setState({total: data.data.total[0].total});
			this.setState({winStreak: data.data.winStreak[0].winStreak});
			this.setState({totalProgress: data.data.totalProgress});
			this.setState({winRecord: data.data.winRecord});
		});
	}

  render() {  	
    return (
      <div className="dashboard">
        <Header as="h1" className="dashboard__header">dashboard</Header>
        <Main 
			avgWin={this.state.avgWin}
			lastPlay={this.state.lastPlay}
			monthTotal={this.state.monthTotal}
			numRecords={this.state.numRecords}
			sevenDays={this.state.sevenDays}
			total={this.state.total}
			winStreak={this.state.winStreak}
			totalProgress={this.state.totalProgress}
			winRecord={this.state.winRecord}
        />
      </div>
    );
  }
}

export default Dashboard;
