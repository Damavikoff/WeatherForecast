import React, { Component } from "react"

class ErrorMessage extends Component {
	render() {
		return (
			<>
				<div className="dimmer">
					<div className="centered">
						<div className="error message">
							<div className="header">
								Ошибка!
							</div>
							<div className="description">
								{this.props.description}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default ErrorMessage
