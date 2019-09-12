const form = document.querySelector(".js-form"),
    selectInput = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

//localStorage.setItem("userName", "MINYOUNG")으로 콘솔창에 미리 입력
const USER_LS = "userName";
const SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
    //새로고침을 해도 남아있도록 설정
}

function handleSubmit(event){
    event.preventDefault();
    // 이벤트 버블링을 방지하기 위함
    // input으로 form 제출하는 이벤트가 발생하면 event가 계속 올라가, document까지 올라가면서 새로고침이 된다.
    // input을 사용해서 엔터를 클릭했을 때 submit되면서 새로고침되는 기본 동작을 방지하는 것(event 금지 선언)
    const currentValue = selectInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    //새로고침하면 다시 사라진다. 왜냐면 localstorage에 저장되지 않았기 때문에,
    // input으로부터 온 value를 localStorage에 저장한다. 위에 함수를 선언

}

//currentUser가 없을 경우
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    //default에 의해서 값을 입력하고 enter를 눌렀을 경우 새로고침이 일어나서, 이벤트 버블링을 방지해야 한다. 위에 함수 선언
}

// 로컬스트리지에 유저가 있을 경우 텍스트에 컬러를 기입하자!
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Have a Niceday, ${text} !`;
}

//로컬스토리지의 값을 가져온다.
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
        //로컬 스토리지에 유저가 있을 때 어떤 값을 취할 것인기?
        paintGreeting(currentUser);
    }
}


function init () {
    loadName();
}

init();

/*
* querySelector : 찾은 첫번째 것을 가져온다.
* querySelectorAll : 모든 동일한 것을 가져온다. 클래스명에 따른 엘리먼트들을 가져옴
* greElementById : id
*
* localstorage : 작은 정보를 나의 로컬 컴퓨터에 저장하는 방법
* 개발자도구 > application > local storage 들어가면 많은 정보들이 저장되어 있다.
* 값을 바꾸고, refresh 하면 자바스크립트 정보들을 바꿔줄 수 있다,.
* localStorage.setItem('nico',true); 하고 application > localstorage 가면 바뀌어 있을 것이다.
* localStorage.getItem("nico"); (nico 다음의 값을 출력하는 메소드)
* // true
* application > localstorage > nico 의 값을 바꾸고 다시한번 console창에 쳐보면, 바뀐 값이 출력
*
*
* preventDefault
* 어떤 이벤트가 일어났을 때 상위로 타고 올라가지 않도록 방지하는것 (버블링)
* 엔터를 누르면 submit되면서 새로고침이 되는 현상을 막아주는 것
*
*
* */