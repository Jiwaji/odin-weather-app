const cityInput = document.querySelector('input')
const submitBtn = document.querySelector('button')
const cityError = document.querySelector('.cityerror')
const appId = '27e5bf61dcbdeb3d91cf8b11080640d5'
const cityDisplay = document.querySelector('.city')
const tempDisplay = document.querySelector('.temp')
const weatherDisplay = document.querySelector('.weather')

submitBtn.addEventListener('click', async function(e) {
    if(!cityInput.value) {
        cityError.textContent = 'Error'
    }

    const latLong = await getLatLong(cityInput.value)
    const weatherDetails = await getWeather(latLong.lat, latLong.lon)
    const { name, weather, main} = weatherDetails
    cityDisplay.textContent = name
    weatherDisplay.textContent = weather[0].main
})



async function getWeather(lat, lon) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`)
    const data = await res.json()
    return data
}

async function getLatLong(city){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appId}`)
    const data = await res.json()
    return data[0]
}