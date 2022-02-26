import React, { Component } from "react"
import { formatDate } from '../utils'

class HourlyWeatherItem extends Component {
	get data() {
		const data = this.props.data
		return {
			time: formatDate(data.dt, 'hh:mi'),
			date: formatDate(data.dt, 'w, m d'),
			temp: Math.round(data.temp),
			diffHeight: 1 + 0.3 * data.tempDiff
		}
	}
	render() {
		const itemData = this.data
		return (
			<>
				<div className="cell">
					<div className="upper">
						<span className="degrees">{itemData.temp}</span>
					</div>
					<div className="lower" style={{height: `${itemData.diffHeight}em`}}></div>
					<div className="meta">{itemData.time}</div>
					<div className="meta">{itemData.date}</div>
				</div>
			</>
		)
	}
}

export default HourlyWeatherItem
