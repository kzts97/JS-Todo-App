const createBtn =document.getElementById('create-btn');
const list = document.getElementById('list');

let todos = [{ //버튼을 눌럿을때 생성.toggling
    id: 1,
    text: '뭐하지',
    complete: true
}];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
	const item = {
		id: new Date().getTime(), 
		text: '',
		complete: false
	}

    //배열에 처음에 새로운 아이템을 추가
    todos.unshift(item);

    //요소 생성하기
    const {
        itemEl ,
        inputEl ,
        editBtnEl,
        removeBtnEl
    } = createTodoElemet(item)


    //리스트 요소안에  아이템 요소 추가.
    list.prepend(itemEl);

    //disabled 속성 제거
    inputEl.removeAttribute('disabled');
    //input 요소안에 포커스
    inputEl.focus();

}

function createTodoElemet(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if( item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';
    

        // remove 버튼 클릭 이벤트 처리
        removeBtnEl.addEventListener('click', () => {
            // 할 일 항목을 제거하고 화면에서도 삭제
            todos = todos.filter(todo => todo.id !== item.id);
            itemEl.remove();
        });

    checkboxEl.addEventListener('change',()=>{
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complate');

        }else {
            itemEl.classList.remove('complate');
        }
    })

 //타이핑하면 input이라는 이벤트가 발생. ㄴ
 inputEl.addEventListener('input',() =>{
    item.text =inputEl.value;
})

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {
        itemEl ,
        inputEl ,
        editBtnEl,
        removeBtnEl

        
    }

}