const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos-List";

//할일 목록을 배열로
let toDos = [];

/* console.log(event.target);
* target : event 에 target button이 계속 뜨게하는 것으로, 해당 각각의 button의 부모 li 의 id를 알면 li를 삭제할 수 있다.
* console.log(event.target.parentNode);
* dir 으로 찾아보면 parentNode : li#1이 있고, 위와 같이 입력하면 어떤 부모인지 알 수 있다.
 */

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    //해당 페이지의 리스트를 가져와서 적용시킨다.
    toDoList.removeChild(li);
    //새로고침을 하면 삭제되지 않고 다시 나타난다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // 190820 - filter : 반복하면서 true 되는 조건을 담아서 새로운 배열을 만든다.
    // 190820 - parseInt("12.345") // 12 --> 문자열을 분석하고 특정 진수를 사용한 정수로 변환해 반환한다.
    toDos = cleanToDos;
    saveToDos();
}

// toDos를 가져와서 로컬스토리지에 저장하는 함수
function saveToDos() {

    /*
    * local storage에는 자바스크립트의 data를 저장할 수 없다. 모든 데이터를 string으로 저장하고자 한다.
    * 오직 string만 넣을 수 있다. 때문에 application > localstorage를 보면 [object,objcet]라고 뜨기 때문에, object를 string으로 바꿔줘야 한다.
    * localStorage.setItem(TODOS_LS,toDos); 를 아래와 같이 string 으로 바꿔준다.
    * JSON.stringify > 자바스크립트 object를 stinrg으로 바꿔준다.
    */
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//handleSubmitList에서 가져온 input의 value 값을 이용해서, list 만들기
function paintToDo(value) {
    const createLi = document.createElement("li");
    const createDelBtn = document.createElement("button");
    const createSpan = document.createElement("span");
    // li의 순서를 정하기 위해서 변수 선언
    const newNum = toDos.length + 1;
    createDelBtn.innerText = "X";
    createDelBtn.addEventListener("click", deleteToDo);
    createSpan.innerText = value;
    //li 내부에 span / button 태그 삽입
    createLi.appendChild(createDelBtn);
    createLi.appendChild(createSpan);
    createLi.id = newNum;
    //js-toDoList 내부에 li 태그 삽입입
    toDoList.appendChild(createLi);
    //local storage 에도 list 를 저장해야 하기 때문에 이런식으로 짠다.
    const toDoObj = {
        inputValue: value,
        id: newNum
    };
    toDos.push(toDoObj);

    saveToDos();
}

//input의 값을 가져와서, paintValue 함수 추가
//form 에서 이벤트 버블링을 방지하기 위해서 event 아규먼츠 삽입 후 preventDefault 적용
function handleSubmitList(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
//    이게 왜 필요할까요 ? ?
}


//로컬 스토리지에서 불러온 것을 실제 화면에 구현해보자
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // console.log(loadedToDos);
        /*    불러오는 것이 JSON.stringify(toDos) 으로 string 변경된 상태로 오기 때문에,
        *  데이터를 전달할 때, 자바스크립트가 그것을 다룰 수 있또록 다시 object형태로 바꾸어 주어야한다.
        * JSON.stringify(toDos)
        *
        */
        const parseToDos = JSON.parse(loadedToDos);
        // console.log(parseToDos);
        //parseToDos 안에 있는 것들을 이용해서 paintToDo를 실행해보자
        //forEach - array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 주는것
        parseToDos.forEach(function (toDo) {
            paintToDo(toDo.inputValue)
        })


    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmitList)

}

init();

/*
* 자바스크립트의 localStorage는 string 형태로 저장한다.
* JS Object > string
* JS string > Object
*
* filter 배열의 모든 아이템을 통해 함수를 실행하고, true인 아이템들만 가지고 새로운 배열을 생성한다.
*
*/