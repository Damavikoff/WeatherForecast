import React, { Component } from "react"

class Loader extends Component {
	render() {
		return (
			<>
				<div className="dimmer">
					<div className="centered">
						<div className="loader"></div>
					</div>
				</div>
			</>
		)
	}
}

export default Loader
