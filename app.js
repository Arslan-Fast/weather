const API_KEY = "e78f4d648f70456d911200649263004";

async function getWeather(city = "Gujranwala") {
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );

        const data = await res.json();

        if (data.error) {
            alert("City not found!");
            return;
        }

        document.querySelector(".location").innerText =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").innerText = data.current.temp_c + "°C";
        document.getElementById("condition").innerText = data.current.condition.text;
        document.getElementById("feels").innerText = data.current.feelslike_c;

        document.getElementById("wind").innerText = data.current.wind_kph + " km/h";
        document.getElementById("humidity").innerText = data.current.humidity + "%";
        document.getElementById("visibility").innerText = data.current.vis_km + " km";
        document.getElementById("pressure").innerText = data.current.pressure_mb + " mb";
        document.getElementById("dew").innerText = data.current.dewpoint_c + "°";

        document.querySelector(".icon").innerHTML =
            `<img src="https:${data.current.condition.icon}">`;

        const now = new Date();
        document.getElementById("desc1").innerText =
            "Time: " + now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

        const updateTime = new Date(data.current.last_updated_epoch * 1000);
        document.getElementById("time").innerText =
            "Updated: " + updateTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

    } catch (error) {
        console.log(error);
    }
}

function searchWeather() {
    const city = document.getElementById("cityInput").value;
    if (city.trim() !== "") {
        getWeather(city);
    }
}

document.getElementById("cityInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

getWeather();