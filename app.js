let currcity="Sangli";
let units="metric";
let city=document.querySelector(".weathercity");
let datetime=document.querySelector(".datetime");
let weatherforecast=document.querySelector(".weatherforecast");
let weathertemp=document.querySelector(".weathertemp");
let weathericon=document.querySelector(".weathericon");
let weatherminmax=document.querySelector(".weatherminmax");
let weatherrealfeel=document.querySelector(".weatherrealfeel");
let weatherhum=document.querySelector(".weatherhum");
let weatherwind=document.querySelector(".weatherwind");
let weatherpressure=document.querySelector(".weatherpressure");


document.querySelector(".weathersearch").addEventListener('submit',e=>{
    let search=document.querySelector('.weathersearchform');
    e.preventDefault();
    currcity=search.value;
    getweather();
    search.value="";
})

//units
document.querySelector(".weathercelcius").addEventListener('click',()=>{
    if(units!='metric')
    {
        units='metric'
        getweather();
    }
})

document.querySelector(".weatherfar").addEventListener('click',()=>{
    if(units!='imperial')
    {
        units='imperial'
        getweather();
    }
    
})

//convert country code to country name
function convert(country){
    let region=new Intl.DisplayNames(["en"] ,{type:'region'});
    return region.of(country);
}

//convert timezone
function converttime(timestamp,timezone){
    // const converttimezone=timezone/3600;//convert second to hour

    const date =new Date(timestamp*1000);

    const options={
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        // TimeZone:`Etc/GMT${converttimezone>=0? "-":"+"}${Math.abs(converttimezone)}`,
        TimeZone: "Asia/Kolkata",
        hour12:true
    }

    return date.toLocaleString("en-IN",options);

}

function getweather(){
    const apikey='6749b473489d22ecc921d0a32b66302e';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=${apikey}&units=${units}`)
    .then(res => res.json())
    .then(data =>{

        // For Body
        // const currentHour = new Date().getHours();

        //     // Set class on the body based on the time of day
        //     if (currentHour >= 6 && currentHour < 12) {
        //         document.body.className = 'morning';
        //     } else if (currentHour >= 12 && currentHour < 18) {
        //         document.body.className = 'afternoon';
        //     } else {
        //         document.body.className = 'night';
        //     }

        const currentHour = new Date().getHours();
        const container = document.querySelector('.container');

        if (currentHour >= 5 && currentHour < 12) {
            container.classList.remove('afternoon', 'night' , 'evening');
            container.classList.add('morning');
        } else if (currentHour >= 12 && currentHour <17) {
            container.classList.remove('morning', 'night' ,'evening');
            container.classList.add('afternoon');
        } else if (currentHour >= 17 && currentHour <21) {
            container.classList.remove('morning', 'night' , 'afternoon');
            container.classList.add('evening');
        }
        else {
            container.classList.remove('morning', 'afternoon' , 'evening');
            container.classList.add('night');
        }

        city.innerHTML=`${data.name}, ${convert(data.sys.country)}`;

        datetime.innerHTML=converttime(data.dt,data.timezone);

        weatherforecast.innerHTML=data.weather[0].main;

        weathertemp.innerHTML=`${data.main.temp}&#176`;

        weathericon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`

        weatherminmax.innerHTML=`<p>Min: ${data.main.temp_min}&#176</p> <p>Max: ${data.main.temp_max}&#176</p>`

        weatherrealfeel.innerHTML=`${data.main.feels_like}&#176`;
        weatherhum.innerHTML=`${data.main.humidity}%`;
        weatherwind.innerHTML=`${data.wind.speed} ${units ==="metric" ? "m/s": "mph"}`;
        weatherpressure.innerHTML=`${data.main.pressure} hPa`;
    })
}

document.body.addEventListener('load',getweather());

document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('toggle-mode');
    const toggleIcon = document.getElementById('toggle-icon');

    // Check user's preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    // Apply dark mode if enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        toggleIcon.className = 'fas fa-moon'; // Change the icon to moon for dark mode
    }

    // Toggle dark mode on button click
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkModeEnabled = document.body.classList.contains('dark-mode');

        // Toggle icon based on dark mode state
        toggleIcon.className = isDarkModeEnabled ? 'fas fa-sun' : 'fas fa-moon';

        // Save user's preference to localStorage
        localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
    });
});


