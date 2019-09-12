/*
* math.random()
* math.floor() 버림
* math.ceiling() 올림
* math.floor(math.random()*3)
*
* */

const body = document.querySelector("body");

//190820 - 개발하기 쉽도록 의미를 부여해주는 것이 좋다 (일종의 가독성.....???)
const IMG_NUMBER = 5;

function paintImage(imgNum){
    const image = new Image();
    image.src = `image/${imgNum + 1}.jpg`;
    // 190820 - image의 경로 / 값을 추가해주는 기능 
    image.classList.add("bgImage");
    body.prepend(image);

}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}


function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);

}

init();