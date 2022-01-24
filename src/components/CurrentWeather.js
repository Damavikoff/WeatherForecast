import React, { Component } from "react"
import { formatDate } from '../utils'
import { ICO_SOURCE } from '../defaults'

class CurrentWeather extends Component {
    
	get data() {
		const data = this.props.data
		const weather = data.weather[0];
		return {
			date: formatDate(data.dt, 'mmm d, hh:mi'),
			temp: Math.round(data.temp),
			feelsLike: Math.round(data.feels_like),
			location: data.location,
			weatherTitle: weather.main,
			weatherIcon: ICO_SOURCE + weather.icon + '.svg',
			humidity: data.humidity,
			pressure: data.pressure,
			windSpeed: Math.round(data.wind_speed),
			windDeg: data.wind_deg,
			clouds: data.clouds,
			sunrise: formatDate(data.sunrise, 'hh:mi'),
			sunset: formatDate(data.sunset, 'hh:mi')
		}
	}

	render() {
		return (
			<>
				<div className="centering segment">
					<div className="centered content">
						<div className="center aligned image container">
							<img src={this.data.weatherIcon} alt="" />
							<div className="small header">
								<div className="sub header">
									{this.data.date}
								</div>
							</div>
						</div>
						<div className="center aligned container">
							<div className="large light header">
								<div className="degrees">{this.data.temp}</div>
							</div>
						</div>
						<div className="container">
							<div className="small header">
								<div className="sub header">
									{this.data.location}
								</div>
								<div className="content">{this.data.weatherTitle}</div>
								<div className="sub header">
									Feels like <span className="degrees">{this.data.feelsLike}</span>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="small light image header">
								<img src={ICO_SOURCE + 'barometer.svg'} alt="" />
								<div className="sub header">
									{this.data.pressure} hPa
								</div>
							</div>
							<div className="small light image header">
								<img src={ICO_SOURCE + 'humidity.svg'} alt="" />
								<div className="sub header">
										{this.data.humidity}%
								</div>
							</div>
							<div className="small light image header">
								<img src={ICO_SOURCE + 'wind.svg'} alt="" />
								<div className="sub header">
									{this.data.windSpeed} m/s
								</div>
								<img src={ICO_SOURCE + 'pressure-low.svg'}
									style={{transform: `rotate(${this.data.windDeg}deg)`}}
									className="wind" alt="" />
							</div>
						</div>
						<div className="container">
							<div className="small light image header">
								<img src={ICO_SOURCE + 'sunrise.svg'} alt="" />
								<div className="sub header">
									{this.data.sunrise}
								</div>
							</div>
							<div className="small light image header">
								<img src={ICO_SOURCE + 'sunset.svg'} alt="" />
								<div className="sub header">
									{this.data.sunset}
								</div>
							</div>
							<div className="small light image header">
								<img src={ICO_SOURCE + 'cloudy.svg'} alt="" />
								<div className="sub header">
									{this.data.clouds}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default CurrentWeather