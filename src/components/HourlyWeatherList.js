import React, { Component } from "react"

import HourlyWeatherItem from "./HourlyWeatherItem";

class HourlyWeatherList extends Component {
    get hourlyList() {
			const data = this.props.data;
			const minHourlyTemp = Math.round(Math.min.apply(Math, data.map(function(el) { return el.temp })))
			return data.map((el, index) => {
				el.tempDiff = Math.round(el.temp) - minHourlyTemp
				return (<HourlyWeatherItem key={'hw-' + index} data={el}/>)
			})
    }
    render() {
        return (
					<>
						<div className="hourly grid">
							{this.hourlyList}
						</div>
					</>
        )
    }
}

export default HourlyWeatherList
