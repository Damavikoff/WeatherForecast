const setActiveLocation = index => {
  return {
    type: 'location/active',
    index
  }
}

const setCurrentCoords = location => {
  return {
    type: 'location/coords',
    location
  }
}

const setReadyState = state => {
  return {
    type: 'state/ready',
    state
  }
}

export {
  setActiveLocation,
  setCurrentCoords,
  setReadyState
}