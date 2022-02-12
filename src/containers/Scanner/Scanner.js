import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import SpanChangeDeco from '../../components/SpanChangeDeco/SpanChangeDeco'
import MarketDataUnit from '../../components/MarketDataUnit/MarketDataUnit'
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { Table } from 'antd'
import { Input } from 'antd'
import { Modal } from 'antd'
import axios from '../../axios-coinLore'
import classes from './Scanner.module.css'
//import {Pie} from 'react-chartjs-2';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';
  import { Bar,Pie } from 'react-chartjs-2';
 // import faker from 'faker';

  ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
  );

class Scanner extends Component {
	state = {
		cards: [
			{
				id: 'rank',
				value: null,
				show: true
			},
			{
				id: 'name',
				value: null,
				show: true
			},
			{
				id: 'market_cap_usd',
				value: null,
				show: true
			},
			{
				id: 'volume24',
				value: null,
				show: true
			},
			{
				id: 'price_usd',
				value: null,
				show: true
			},
			{
				id: 'percent_change_24h',
				value: null,
				show: true
			}


		],
		coinsData: [],
		tableData: [],
		tableSocialDataDetails: [],
		id: [],
		tableLoading: true,
		pageSize: 10,
		totalCoins: 100,
		showHideComp1: false,
		showHideComp2: false,
		isMainPage: true,
		ChartDetailsData: []

	}
	componentWillUnmount() {
		
	}
	componentDidCatch(error,errinfo)
	{   
		this.withErrorHandler(); //errorService.log({error, errorInfo });
	}
	componentDidMount() {
		
		if((window.location.href.indexOf("/CoinDetailsPage") > -1)){

			this.state.isMainPage = false;
			let urlParams = new URLSearchParams(window.location.search);
			let myParam = urlParams.get('ID');
			myParam.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
			this.getBitCoinDetail(parseInt(myParam));
			this.getMarketDataGraph(parseInt(myParam));
			this.getSocialStatus(parseInt(myParam))
		}else{
			
			this.state.isMainPage = true;
			this.getAllData();
			}
	}
	getAllData() {
		axios
			.get('/tickers/')
			.then(res => {
				const tableData = res.data.data.map((element, index) => {
					return { ...element, key: index }
				})
				this.setState({ coinsData: tableData, tableData: tableData, tableLoading: false })
			})
			.catch(err => {
				this.errorHandler(err)
			})
	}
	getBitCoinDetail(ID) {
		axios
			.get('ticker/?', { params: { id: ID } })
			.then(response => {
				const { rank, name, market_cap_usd, volume24, price_usd, percent_change_24h, } = response.data[0]
				const updatedCards = [...this.state.cards]
				updatedCards[0].value = rank
				updatedCards[1].value = name
				updatedCards[2].value = (market_cap_usd / 1e9).toFixed(2)
				updatedCards[3].value = (volume24 / 1e9).toFixed(2)
				updatedCards[4].value = price_usd
				updatedCards[5].value = percent_change_24h

				this.setState({ cards: updatedCards })
			})
			.catch(err => {
				this.errorHandler(err)
			})
	}
	getMarketDataGraph(ID)
	{
		{
			axios
			.get('coin/markets/?', { params: { id: ID } })
			.then(response => {						
				let name = [];
				let price = [];
						
				for(const dataObj of response.data.slice(0,10)){
					name.push(dataObj.name);
				 	price.push(dataObj.price);
			
			}

				this.setState({ 
					ChartDetailsData: {
					labels: name,
					datasets:[
					   {
						  label:"Crypto",
						  data: price,
						  //backgroundColor: 'rgba(75,192,192,1)',
						  //borderColor: 'rgba(0,0,0,1)',
						  loading:true,
						  borderWidth: 2,
						  backgroundColor: [
							'rgba(255, 99, 132, 0.2)'
							
						  ],
						  borderColor: [
							'rgb(255, 99, 132)'
							
						  ],
					   }
					]
				 }
				 
				 });
			  })
		  }
	}
	getSocialStatus(ID)
	{
		axios	
		.get('https://api.coinlore.net/api/coin/social_stats/?', {params: { id: ID } })//{ params: { id: ID.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') } })			
		
		.then(SocialRepsonse => {
				const DetailtableData = SocialRepsonse.data.map((element, index) => {
					
				return { ...element, key: index }
				
			})
			this.state.setState({ coinsData: DetailtableData, tableSocialDataDetails: DetailtableData, tableLoading: false })
			
		})
		.catch(err => {
			this.errorHandler(err)
		})

	}
	searchHandler = input => {
		const coins = [...this.state.coinsData]
		const filteredCoins = coins.filter(
			coin =>
				coin.name.toLowerCase().includes(input.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(input.toLowerCase())
		)
		this.setState({ tableData: filteredCoins, totalCoins: filteredCoins.length })
	}

	onShowSizeChange = (_, pageSize) => {
		this.setState({ pageSize: pageSize })
	}

	errorHandler = err => {
		Modal.error({
			title: 'Error message',
			content: `${err} ; Likely Bad HTTP request`
		})
	}
	Ondetails(id) {
		this.state.isMainPage = false;
		window.location.href=(`http://localhost:3000/CoinDetailsPage?ID=${id}`);
	}
	render() {

			const columns = [
			{
				title: 'Rank',
				dataIndex: 'rank',
				key: 'rank',
				sorter: (a, b) => a.rank - b.rank
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'coin',
				render: (text, record) => {
					return (
						<div className={classes.Coin} >
							<img
								src={`/images/coins/${record.symbol}.png`}
								alt='coin logo'
								height='30px'

							/>
							<a onClick={() => { this.Ondetails(record.id); }}>{text}</a>
						</div>
					)
				}
			},
			{
				title: 'Price',
				dataIndex: 'price_usd',
				key: 'price',
				render: text => <span>$ {text}</span>
			},
			{
				title: '1h',
				dataIndex: 'percent_change_1h',
				key: '1h',
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_1h - b.percent_change_1h
			},
			{
				title: '24h',
				dataIndex: 'percent_change_24h',
				key: '24h',
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_24h - b.percent_change_24h
			},
			{
				title: '7d',
				dataIndex: 'percent_change_7d',
				key: '7d',
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_7d - b.percent_change_7d
			},
			{
				title: '24h Volume',
				dataIndex: 'volume24',
				key: 'volume24',
				render: text => <MarketDataUnit data={text} />,
				sorter: (a, b) => a.volume24 - b.volume24
			},
			{
				title: 'Market Cap',
				dataIndex: 'market_cap_usd',
				key: 'm-cap',
				render: text => <MarketDataUnit data={text} />
			},

		]

		const Detailscolumns = [
			{
				
				title: 'reddit',
				dataIndex: 'reddit',
				key: 'subscribers',
			
			},
		
			{
				title: 'twitter',
				dataIndex: 'subscribers',
				key: 'subscribers',
				render: (text, record) => {
					return (
						<div className={classes.Coin}>
							<img
								src={`/images/coins/${record.symbol}.png`}
								alt='coin logo'
								height='30px'
							/>
							{text} <span>[{record.reddit.avg_active_users}]</span>
							
						</div>
					)
				}
			}
			
		]

		const { Search } = Input
		return (
			<>
				{this.state.isMainPage === true ? (
					<>
						<div className={classes.Search}>
							<Search
								placeholder='Search Coins'
								onChange={e => this.searchHandler(e.target.value)}
								style={{ width: 300 }}
								size='large'
							/>
						</div>
						
							<Table
								columns={columns}
								dataSource={this.state.tableData}
								style={{ margin: '10px 50px' }}
								loading={this.state.tableLoading}
								pagination={{
									pageSize: this.state.pageSize,
									showSizeChanger: true,
									pageSizeOptions: ['10', '25', '50', '100'],
									total: this.state.totalCoins,
									onShowSizeChange: this.onShowSizeChange

								}}
							/>
						
					</>
				) :
					
					<>
					<Cards cardsData={this.state.cards} ></Cards>
					<Bar data={this.state.ChartDetailsData}></Bar> 
					{/* <Pie data={this.state.ChartDetailsData} options={{maintainAspectRatio: false}}></Pie> */}
					{/* <Pie
          data={this.state.ChartDetailsData}
          options={{maintainAspectRatio: false}}></Pie> */}


					<Table 
					columns={Detailscolumns}
					dataSource={this.state.tableSocialDataDetails}
					style={{ margin: '10px 50px' }}
					pagination={{
						pageSize: this.state.pageSize,
						showSizeChanger: true,
						pageSizeOptions: ['10', '25', '50', '100'],
						total: this.state.totalCoins,
						onShowSizeChange: this.onShowSizeChange

					}}
				/>
					</>
					
				}
			</>
		)
	}
}

export default Scanner


