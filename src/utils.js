const getPosition = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	})
}

const prepareUrl = (url, position) => {
	const { latitude, longitude } = position;
	return url.replace('latitude', latitude).replace('longitude', longitude)
}

const doRequest = async (url) => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Url: ${url} \n ${response.status} (${response.statusText})`);
	}
	return response.json()
}

class DateUtils {
	static #weekDays = [
		{short: 'Sun', long: 'Sunday'},
		{short: 'Mon', long: 'Monday'},
		{short: 'Tue', long: 'Tuesday'},
		{short: 'Wed', long: 'Wednesday'},
		{short: 'Thu', long: 'Thursday'},
		{short: 'Fri', long: 'Friday'},
		{short: 'Sat', long: 'Saturday'}
	]

	static #months = [
		{short: 'Jan', long: 'January'},
		{short: 'Feb', long: 'February'},
		{short: 'Mar', long: 'March'},
		{short: 'Apr', long: 'April'},
		{short: 'May', long: 'May'},
		{short: 'Jun', long: 'June'},
		{short: 'Jul', long: 'July'},
		{short: 'Aug', long: 'August'},
		{short: 'Sep', long: 'September'},
		{short: 'Oct', long: 'October'},
		{short: 'Nov', long: 'November'},
		{short: 'Dec', long: 'December'}
	]

	static format(date, format = 'dd-mm-yyyy') {
		let currDate = date
		if (typeof currDate === 'number') {
			currDate = new Date(currDate * 1000)
		}

		const hours = currDate.getHours().toString().padStart(2, 0);
		const minutes = currDate.getMinutes().toString().padStart(2, 0);
		const day = currDate.getDate();
		const dayPadded = day.toString().padStart(2, 0);
		const weekDay = currDate.getDay();
		const weekDayShort = this.#weekDays[weekDay].short;
		const weekDayLong = this.#weekDays[weekDay].long;
		const month = currDate.getMonth() + 1;
		const monthPadded = month.toString().padStart(2, 0);
		const monthShort = this.#months[month].short;
		const monthLong = this.#months[month].long;
		const year = currDate.getFullYear();

		return format.replace(/hh/g, hours)
									.replace(/mi/g, minutes)
									.replace(/dd/g, dayPadded)
									.replace(/d/g, day)
									.replace(/ww/g, weekDayLong)
									.replace(/w/g, weekDayShort)
									.replace(/mmm/g, monthLong)
									.replace(/mm/g, monthPadded)
									.replace(/m/g, monthShort)
									.replace(/yyyy/g, year)
	}
}

const formatDate = (date, format) => {
	return DateUtils.format(date, format)
}

export {
	getPosition,
	doRequest,
	prepareUrl,
	formatDate
}
