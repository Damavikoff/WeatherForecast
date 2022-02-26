import React, { Component } from "react"
import { formatDate } from '../utils'
import { ICO_SOURCE } from '../defaults'

class DailyWeather extends Component {
	get data() {
		const data = this.props.data
		const weather = data.weather[0]
		return {
			date: formatDate(data.dt, 'w, mmm d'),
			maxTemp: Math.round(data.temp.max),
			minTemp: Math.round(data.temp.min),
			weatherTitle: weather.main,
			weatherIcon: ICO_SOURCE + weather.icon + '.svg',
		}
	}
	render() {
		return (
			<>
				<div className="segment">
					<div className="content">
						<div className="small header">
							<div className="sub header">{this.data.date}</div>
						</div>
					</div>
					<div className="centered content">
						<div className="image container">
							<img src={this.data.weatherIcon} className="image" alt="" />
						</div>
						<div className="container">
							<div className="small light header">
								<div className="degrees">{this.data.minTemp}</div>  <div className="red degrees">{this.data.maxTemp}</div>
								<div className="sub header">{this.data.weatherTitle}</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default DailyWeather
