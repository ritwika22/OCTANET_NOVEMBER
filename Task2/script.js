const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

var allTask = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
createTask();

function addTask() {
    var val = inputBox.value
    if (val === '') {
        alert("Input box cannot be empty!!!");
    } else {
        var task = {
            title: val,
            checked: false,
        }
        allTask.push(task);
    }
    inputBox.value = "";
    createTask();
}

function createTask() {
    listContainer.innerHTML = "";
    content = ""
    for (i = 0; i < allTask.length; i++) {
        if(allTask[i].checked){
            content += "<li class=\"checked\">"
        }
        else{
            content += "<li>"
        }
        content += "<div class=\"check-div\"> \
                    <span class=\"material-symbols-outlined\"> \
                    check_circle \
                    </span> \
                    </div> \
                    <p>" +
                        allTask[i].title +
                    "</p> \
                    <div class=\"edit-div\"> \
                    <span class=\"material-symbols-outlined\"> \
                    border_color \
                    </span> \
                    </div> \
                    <div class=\"delete-div\"> \
                    <span class=\"material-symbols-outlined\"> \
                    delete \
                    </span> \
                    </div> \
                    </li>";
    }
    listContainer.innerHTML = content;
    localStorage.setItem('tasks', JSON.stringify(allTask));
    addEventListenerToAllTask();
}

function addEventListenerToAllTask() {
    var chk_div = document.getElementsByClassName("check-div");
    for (i = 0; i < chk_div.length; i++) {
        chk_div[i].addEventListener("click", function (e) { addCheck(e); });
    }

    var del_div = document.getElementsByClassName("delete-div");
    for (i = 0; i < del_div.length; i++) {
        del_div[i].addEventListener("click", function (e) { delTask(e); });
    }

    var edt_div = document.getElementsByClassName("edit-div");
    for (i = 0; i < edt_div.length; i++) {
        edt_div[i].addEventListener("click", function (e) { edtTask(e); });
    }
}

function addCheck(event){
    console.log(event);
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    for(i=0;i<allTask.length;i++){
        if(p.innerHTML == allTask[i].title){
            allTask[i].checked = !allTask[i].checked;
        }
    }
    createTask();
}

function delTask(event){
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    index_to_del = 0;
    for(i=0;i<allTask.length;i++){
        if(p.innerHTML == allTask[i].title){
            index_to_del = i;
            break;
        }
    }
    allTask.splice(index_to_del, 1);
    createTask();
}

function edtTask(event){
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    inputBox.value = p.innerHTML;
    delTask(event);
}