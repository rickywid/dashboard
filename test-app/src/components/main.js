import React, { Component } from 'react';
import moment from 'moment';
import '../css/main.css';
import { Header, Grid, Segment, Icon } from 'semantic-ui-react';
import { 
			LineChart,  
			BarChart,
			PieChart,
			AreaChart,
			Area,
			Pie,
			Bar,
			Line, 
			XAxis, 
			YAxis, 
			CartesianGrid, 
			Tooltip, 
			Legend,
			ResponsiveContainer
		}  from 'recharts';

class Main extends Component {

	constructor(props){
		super(props);

		this.state = {
			gain: '',
			date: '',
		}
	}

  handleChange(e) {
  	console.log(e.target.value);
  }

  render() {

  	let dataTotalProgress = [];
  	let dataMonthTotal = [];
  	let dataWinRecord = [];
  	let dataLastSeven = [];
  	let sum = 0;
  	let winStreak;
  	let total;
  	let avgWin;
  	let lastPlay;
  	let winPct;

  	if(this.props.winRecord){
  		 winPct = Math.ceil((this.props.winRecord[1].count / this.props.numRecords) * 100);
  	}

  	if(this.props.totalProgress.length){
  		
  		winStreak = (this.props.winStreak >= 0 ? <p>{this.props.winStreak}</p> : <p>{this.props.winStreak}</p>);
  		total = (this.props.total > 0 ? <p><Icon name='plus' size='small' />{this.props.total}</p> : <p>{this.props.total}</p>);
  		avgWin = (this.props.avgWin ? <p><Icon name='plus' size='small' />{this.props.avgWin}</p> : <p><Icon name='minus' size='small' />{this.props.avgWin}</p>);
  		lastPlay = (this.props.lastPlay.gain ? <p><Icon name='plus' size='small' />{this.props.lastPlay.gain}</p> : <p><Icon name='minus' size='small' />{this.props.lastPlay.gain}</p>);

  		for(var i = 0; i < this.props.totalProgress.length; i++){
		  	let obj = { value: sum };
		  	let date = moment(this.props.totalProgress[i].date).format('ll');
  			obj['name'] = date;
  			sum += this.props.totalProgress[i].gain
  			obj['value'] = sum;
  		  	dataTotalProgress.push(obj);
  		}

  		for(var j = 0; j < this.props.monthTotal.length; j++){
		  	let obj = {};
		  	const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		  	
  			obj['name'] = months[this.props.monthTotal[j].month - 1];
  			obj['value'] = this.props.monthTotal[j].gain;
  		  	dataMonthTotal.push(obj);
  		}  		

  		for(var k = 0; k < this.props.winRecord.length; k++){
		  	let obj = {};
  			obj['name'] = this.props.winRecord[k].win;
  			obj['value'] = this.props.winRecord[k].count;
  		  	dataWinRecord.push(obj);
  		} 

  		for(var l = 0; l < this.props.sevenDays.length; l++){
		  	let date = moment(this.props.sevenDays[l].date).format('ll');
	  	  	let obj = {};

  			obj['name'] = date;
  			obj['value'] = this.props.sevenDays[l].gain;
  		  	dataLastSeven.push(obj);
  		}
  	}
    
    return (
      	<div className="main">
			<Grid>
				<Grid.Row stretched>
					<Grid.Column width={4}>
						<Segment>
							<Header as="h4" className="main__subheader">WIN %...</Header>
							<p className="main__numStat">{winPct} %</p>	
							<ResponsiveContainer height={100}>
								<PieChart width={330} height={250}>
									<Pie data={dataWinRecord} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
								</PieChart>	
							</ResponsiveContainer>									
						</Segment>		
						<Segment>
							<Header as="h4" className="main__subheader">Streak</Header>
							<p className="main__numStat">{winStreak}</p>						
						</Segment>								
					</Grid.Column>
					<Grid.Column width={12}>	
						<Segment>
							<Header as="h4" className="main__subheader">TOTAL NET</Header>
							<p className="main__numStat">{total}</p>
								<ResponsiveContainer height={300}>
									<LineChart width={300} height={300} data={dataTotalProgress} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
										<XAxis dataKey="name"/>
										<YAxis/>
										<CartesianGrid/>
										<Tooltip/>
										<Legend />
									<Line type="monotone" dataKey="value" stroke="#8884d8"/>
									</LineChart>							
								</ResponsiveContainer>
						</Segment>							
					</Grid.Column>
				</Grid.Row>
				<Grid.Row stretched>
					<Grid.Column width={4}>
						<Segment>
							<Header as="h4" className="main__subheader">AVG EARNING/PLAY</Header>
							<p className="main__numStat">{avgWin}</p>		
						</Segment>	
						<Segment>
							<Header as="h4" className="main__subheader">LAST PLAY (date)</Header>
							<p className="main__numStat">{moment(this.props.lastPlay.lastPlay).format('ll')}</p>
							<p>{lastPlay}</p>						
						</Segment>							
					</Grid.Column>				
					<Grid.Column width={12}>
						<Segment>
							<ResponsiveContainer height={300}>
								<BarChart width={600} height={400} data={dataMonthTotal}>
								  <CartesianGrid strokeDasharray="3 3" />
								  <XAxis dataKey="name" />
								  <YAxis />
								  <Tooltip />
								  <Legend />
								  <Bar dataKey="value" fill="#8884d8" />
								</BarChart>							
							</ResponsiveContainer>
						</Segment>
					</Grid.Column>					
				</Grid.Row>
				<Grid.Row stretched>									
					<Grid.Column width={16}>
						<Segment>
							<Header as="h4" className="main__subheader">LAST 7 DAYS</Header>
							<ResponsiveContainer height={300}>
								<AreaChart height={400} data={dataLastSeven} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
									<XAxis dataKey="name"/>
									<YAxis/>
									<CartesianGrid strokeDasharray="3 3"/>
									<Tooltip/>
									<Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
								</AreaChart>		
							</ResponsiveContainer>					
						</Segment>															
					</Grid.Column>							
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={4}>
						<form action="http://localhost:3001/add" method="post">
							<label htmlFor="amount">Amount</label>
							<input id="amount" name="amount" type="type" placeholder='0.00' onChange={this.handleChange.bind(this)} />

							<label htmlFor="date">Date</label>					
							<input id="date" type="date" name="date" />
							<input type="submit" value="submit"/>
						</form>
					</Grid.Column>
				</Grid.Row>			
			</Grid>  
      	</div>
    );
  }
}

export default Main;
