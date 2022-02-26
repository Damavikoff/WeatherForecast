import React, { Component } from 'react'
import { connect } from 'react-redux';

import Loader  from './components/Loader'
import ErrorMessage  from './components/ErrorMessage'
import CurrentWeather from './components/CurrentWeather'
import DailyWeather from './components/DailyWeather'
import HourlyWeatherList from './components/HourlyWeatherList'
import SearchInput from './components/SearchInput'

import { setActiveLocation, setReadyState, setCurrentCoords } from './actions'
import { getPosition, doRequest, prepareUrl } from './utils';
import { LOC_URL, FRC_URL } from './defaults'

class App extends Component {
	constructor() {
		super()
		this.state = {
			isSuccessful: true,
			errorMessage: null,
			data: {}
		}
		this.getForecast = this.getForecast.bind(this)
		this.setActiveLocation = this.setActiveLocation.bind(this)
	}

	async componentDidMount() {
		try {
			const position = await getPosition()
			this.props.setCoords(position.coords)
			this.props.setLocation(0)
			await this.getForecast()
		} catch (error) {
			this.setState({
				isSuccessful: false,
				errorMessage: typeof error === 'object' ? error.message : error
			})
		} finally {
			this.props.setReadyState(true)
		}
	}

	async setActiveLocation(id) {
		await this.props.setLocation(id)
		await this.getForecast()
	}

	async getForecast() {

		const timer = setTimeout(() => {
			this.props.setReadyState(false)
		}, 700)

		try {
			const { latitude, longitude } = this.props.location 
			const location = await doRequest(prepareUrl(LOC_URL, { latitude, longitude }))
			const forecast = await doRequest(prepareUrl(FRC_URL, { latitude, longitude }))
			forecast.current.location = location[0].local_names.ascii ?? location[0].local_names.en
			this.setState({
				data: forecast
			})
		} catch (error) {
				this.setState({
					isSuccessful: false,
					errorMessage: typeof error === 'object' ? error.message : error
				})
		} finally {
			clearTimeout(timer)
			this.props.setReadyState(true)
		}
	}

	get currentWeather() {
		return this.state.data.current
	}

	get dailyWeather() {
		return this.state.data.daily.map((el, index) => (<DailyWeather key={'dw-' + index} data={el}/>))
	}

	get hourlyWeather() {
		return this.state.data.hourly
	}

	render() {
		if (!this.props.isReady) {
			return (
				<Loader />
			)
		}
		if (!this.state.isSuccessful) {
			return (
				<ErrorMessage description={this.state.errorMessage}/>
			)
		}
		return (
			<>
				<div className="basic segments">
					<div className="segment">
						<div className="basic segments">
							<div className="segment">
								<SearchInput value={this.props.location.value}
														 data={this.props.locationList}
														 label="Choose location"
														 onChange={this.setActiveLocation}/>
							</div>
							<CurrentWeather data={{...this.currentWeather}} />
							<div className="scrolling-x segment">
								<HourlyWeatherList data={this.hourlyWeather}/>
							</div>
						</div>
						<div className="scrolling">
							{this.dailyWeather}
						</div>
					</div>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	const { value, latitude, longitude } = state.location
	return {
		locationList: state.list,
		location: { value, latitude, longitude },
		isReady: state.isReady
	}
}

const mapDispatchToProps = (dispatch) => ({
	setReadyState: (state) => dispatch(setReadyState(state)),
	setCoords: (coords) => dispatch(setCurrentCoords(coords)),
	setLocation: (location) => dispatch(setActiveLocation(location))
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
