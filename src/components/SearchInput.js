import React, { Component } from "react"
import { ICO_SOURCE } from '../defaults'

class SearchInput extends Component {
	constructor(props) {
		super()
		this.list = props.data
		this.state= {
			typedValue: '',
			selectedValue: props.value ? props.value : props.data[0].value,
			isActive: false
		}
		this.searchInput = React.createRef();
		this.setValue = this.setValue.bind(this)
		this.setActive = this.setActiveState.bind(this, true)
		this.setInactive = this.setActiveState.bind(this, false)
	}

    setValue(event) {
			this.setState({
				typedValue: event.target.value.trim()
			})
    }

    setActiveState(value) {
			this.setState({
				isActive: value
			})
    }

    onNodeClick(node) {
			const {value, name} = node
			if (this.state.selectedValue === value) return
			this.setState({
				selectedValue: value
			})
			this.searchInput.current.value = name
			const onChange = this.props.onChange
			onChange && onChange(value)
    }

    getNodeMarkup(node) {
			const {name} = node
			const search = this.state.typedValue.toLowerCase()
			const regExp = new RegExp(search.replace(/\\/g, '\\\\'),"gi")
			const result = name.replace(regExp, el => `<b>${el}</b>`)
			return {__html: result}
    }

    get filteredList() {
			const search = this.state.typedValue.toLowerCase()
			const filtered = this.list.filter(el => el.name.toLowerCase().includes(search))
			if (!filtered.length) {
					return <dt className="empty">No results</dt>
			}
			return filtered.map((el, index) => {
				const className = this.state.selectedValue === el.value ? 'active' : ''
				return (
					<dt key={'dw-' + index} onMouseDown={() => this.onNodeClick(el)} className={className}>
						<img src={ICO_SOURCE + 'marker.svg'} alt="" />
						<span className="text" dangerouslySetInnerHTML={this.getNodeMarkup(el)}></span>
					</dt>
				)
			})
    }

    render() {
			const className = `${this.state.isActive ? '' : 'collapsed'}`
			return (
				<>
					<div className={`${className} search input`}>
						<label>{this.props.label}</label>
						<input type="text" placeholder="print to search..."
										ref={this.searchInput}
										onKeyUp={this.setValue}
										onFocus={this.setActive}
										onBlur={this.setInactive}	/>
						<img src={ICO_SOURCE + 'search.svg'} alt="" />
						<dl className="list">
							{this.filteredList}
						</dl>
					</div>
				</>
      )
    }
}

export default SearchInput
