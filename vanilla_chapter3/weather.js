/*
  *API - 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
  *오직 데이터를 얻거나 컴퓨터끼리 소통하기 위한 목적으로 가져올 수 있다.
  *이메일을 확인할 때 새로고을 하지 않아도 자동으로 업데이트 되는 것은
  * 자바스크립트가 계속해서 데이터를 가지고 오고 있기 때문이다.
  *
  *
  * */
const weather = document.querySelector(".js-weather");
const API_KEY = "876b79ad68f3ee53e87f7950a9095701";
const COORDS = 'coords';

//API를 이용해서 날씨 가져오기!
function getWeather(lat,lng){

    //fetch()안에는 가져올 데이터가 들어가면 되고, https://넣어주고
    //따옴표가 아닌, 백틱(`) 사용한다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
    console.log(json)
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    })
}

// 로컬스토리지에 좌표 저장하기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}
//아규먼츠로 position인자를 갖는다.
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}

function askForCoords(){
    //navigator API
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
    //getCurrentPosition : requirements가 두가지 있는데
    // 좌표를 가져오는데 성공했을 때 처리하는 함수
    // 좌표를 가져오는데 실패했을 경우 처리하는 함수
}

function loadCoords(){
    const loadedcoords = localStorage.getItem(COORDS);

    if(loadedcoords === null){
        askForCoords();
    } else {
        //get Weather
        const parsedCoords = JSON.parse(loadedcoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }

}

function init(){
    loadCoords();
}

init();