//현재의 시간을 얻고자 하는 js 파일
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // 1. 간단하게
    clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;
    // 2. 자릿수를 맞춰주기 위해서 아래와 같이 변경해줘야 한다.
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours } : 
    ${minutes < 10 ? `0${minutes}` : minutes} : 
    ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime(); //-> 이렇게 지정하면 매 번 새로고침을 해야지 시간이 변경되므로, setInterval을 사용한다. // 1. 간단하게
    setInterval(getTime, 1000); //2. -> 1초마다 상태 값 변경
                                        // 잘 돌아지만 10을 초과하면 10의 자릿수가 사라진다. 고로 위 getTime 식을 변경해주어야 한다.
}

init();

/*
*  console 창에서
*   const date = new Date();
*   // 현재 날짜 년도 시간 등등 나온다.
*   date.getDay();
*   date.getDate();
*   date.getHour();
*   date.getMinutes();
*   등 검색하면 현재 선언한 날짜 / 연도 / 시간 등등에 맞는 값들이 나온다. (현재 말고, 지정한 시점의 값)
* */

/*
* setInterval(실행할 함수, 함수를 실행하고 싶은 간격)
* 원하는 함수를 원하는  간격으로 반복적으로 실행한다.
* setInterval(실행할 함수, 1000) = 3000 > 3초
*
* */

/*
* 삼항 연산자 (작은 if)
* condition ? exprIfTrue : exprIfFalse
* condition이 참이면 expreIfTrue를 출력하고,
* 옳지 않으면 exprIfFalse를 출력한다.
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
*
* */