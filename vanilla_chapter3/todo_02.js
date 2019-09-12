const toDoform = document.querySelector(".js-toDoForm"),
    toDoinput = toDoform.querySelector("input"),
    toDoList= document.querySelector(".js-toDoList");

// 1
const TODOS_LS = "toDo-List"

// 4 할 일 목록을 저장 하기 위해 배열에 담아준다.
const toDos = [];

//7 삭제 버튼 추가하기
function deleteToDo(){
    const selectBtn = event.target;
    const selectLi = selectBtn.parentNode;

    toDoList.removeChild(selectLi);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(selectLi.id);
    })
    toDos = cleanToDos;

    saveToDOs();
}

//  5 로컬스토리지에 저장하기 
function saveToDos(){
     localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

// 3 handleSubmit 에서 받은 인자를 넣어준다.
function paintToDo(text){
    //3 ---------------------------------------------------------------- 
    // console.log(text); -> currentValue 값이 나온다.
    const createLi = document.createElement("li"),
    // 삭제하는 기능의 btn을 생성
        createDelBtn = document.createElement("button");
        createDelBtn.innerHTML = "x";
    // 할일 목록 텍스트가 담아지는 span 생성
        createSpan = document.createElement("span");
        createSpan.innerText = text;
    // li에 button + span 을 추가
    createLi.appendChild(createSpan);
    createLi.appendChild(createDelBtn);
    toDoList.appendChild(createLi);
    // 3 ----------------------------------------------------------------
    // 4 리스트를 배열에 추가하기  ----------------------------------------------------------------
    const newNum = toDos.length + 1;
    //  (배열은 0부터 시작하므로 + 1 )
    const toDoObj = {
        inputValue : text,
        id : newNum
    }
    toDos.push(toDoObj);
    // li 에 id 추가 
    createLi.id = newNum;
    saveToDos();

    // 7 delbtn 추가하기
    createDelBtn.addEventListener("click",deleteToDo);

}

// 2
function handleSubmit(event){
    event.preventDefault();
    // input의 이벤트 방지
    const currentValue = toDoInput.value;
    //3 인자 값으로 currentValue를 넣어준다.
    paintToDo(currentValue); 
    toDoInput.value = "";
}


//  1 우선 생성해준다.
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
// 6 string > object로 변환해주어야 한다.
    if(loadedToDos !== null){
        const parseToDos =JSON.parse(loadedToDos)
        parseToDos.forEach(function (toDo) {
            paintToDo(toDo.inputValue)
        })


    }
}

function init(){
// 1
    loadToDos();
// 2
    toDoform.addEventListener("submit", handleSubmit)

}

init();