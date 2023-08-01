const inputIP = document.querySelector('.inputField')
// const API_LINK = `https://geo.ipify.org/api/v2/country,city?apiKey=at_UypGrn6kdNrUiHBvcg18Ae3Q3CoVA&ipAddress=${(inputIP.value)}`
const pIp = document.querySelector('.ip')
const pLocation = document.querySelector('.location')
const timezone = document.querySelector('.timezone')
const isp = document.querySelector('.isp')
const button = document.querySelector('button')


let latitude, longitude,ip, map

const getIP = () => {
    ip = inputIP.value
}

const getData = () => {
    const API_LINK = `https://geo.ipify.org/api/v2/country,city?apiKey=at_UypGrn6kdNrUiHBvcg18Ae3Q3CoVA&ipAddress=${ip}`
    fetch(API_LINK)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    latitude = data.location.lat
    longitude = data.location.lng
    map = L.map('map', {
        center: [latitude, longitude],
        zoom: 13
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
    pLocation.textContent = data.location.city
    timezone.textContent = data.location.timezone
    isp.textContent = data.isp
    pIp.textContent = data.ip
})
    .catch(err => console.error(err))
}
const removeMap = () => {
    if (map == undefined)
    {
        return
    }
    else{
        map.remove()
    }
  
}



button.addEventListener("click", getIP)
button.addEventListener("click", () => {
    removeMap()
    getData()})



