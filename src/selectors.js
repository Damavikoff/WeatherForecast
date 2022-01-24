const getCurrentCoords = state => {
    const {latitude, longitude} = state.location
    return {
        location: { latitude, longitude }
    }
}

export {
    getCurrentCoords
}