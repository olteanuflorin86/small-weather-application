window.addEventListener('load',() => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');



    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //long = 27.565591167322043;
            //lat = 47.17042754879201;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/e93a56c80b305256da2bd7e319e7f3e2/${lat},${long}`;
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {summary, temperature, icon} = data.currently;
                    // Set DOM elements from the API
                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    //Change temperature to Celsius/ Farenheit
                    temperatureSection.addEventListener('click', setFCandCF(temperature));
                }) 

        });
    }else{
        h1.textContent = "Cannot find your location";
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function setFCandCF(currentTemperature){
        if(temperatureSpan.textContent === "F"){
            temperatureDegree.textContent = Math.floor(((currentTemperature - 32) * (5/9)));
            temperatureSpan.textContent = "C";
        }else{
            temperatureDegree.textContent = currentTemperature;
            temperatureSpan.textContent = "F";
        }
    }
});