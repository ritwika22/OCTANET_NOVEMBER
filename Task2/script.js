const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// function addTask(){
//     if(inputBox.value === ''){
//         alert("Input box cannot be empty!!!");
//     }else{
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         listContainer.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//     }
//     inputBox.value = "";
// }

var allTask = []

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
    addEventListenerToAllTask();
}

function addEventListenerToAllTask() {
    li = listContainer.children;
    for (i = 0; i < li.length; i++) {
        li[i].addEventListener("click", function (e) { addCheck(e); });
    }
}

function addCheck(event){
    li = event.target;
    for(i=0;i<allTask.length;i++){
        if(li.innerHTML == allTask[i].title){
            allTask[i].checked = !allTask[i].checked;
        }
    }
    createTask();
}