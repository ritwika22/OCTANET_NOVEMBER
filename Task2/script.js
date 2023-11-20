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
            priority: "medium"
        }
        allTask.push(task);
    }
    inputBox.value = "";
    createTask();
}

function createTask() {
    listContainer.innerHTML = "";
    content = ""
    allTask.sort(function(a, b){
        prio = {
            high: 0,
            medium: 1,
            low: 2
        };
        x = prio[a.priority];
        if(a.checked){
            x += 5;
        }
        y = prio[b.priority];
        if(b.checked){
            y += 5;
        }
        return x - y;
    });
    for (i = 0; i < allTask.length; i++) {
        content += "<li class=\"" + allTask[i].priority
        if (allTask[i].checked) {
            content += " checked "
        }
        content += "\"><div class=\"check-div\"> \
                    <span class=\"material-symbols-outlined\"> \
                    check_circle \
                    </span> \
                    </div> \
                    <p>" +
                    allTask[i].title +
                    "</p> \
                    <div class=\"prio-div\"> \
                    <div class=\"hover\"> \
                        <span class=\"material-symbols-outlined priority-h high\"> \
                        circle \
                        </span> \
                        <span class=\"material-symbols-outlined priority-m medium\"> \
                        circle \
                        </span> \
                        <span class=\"material-symbols-outlined priority-l low\"> \
                        circle \
                        </span> \
                    </div> \
                    <span class=\"material-symbols-outlined\"> \
                    circle \
                    </span> \
                    </div> \
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

    var edt_div = document.getElementsByClassName("priority-h");
    for (i = 0; i < edt_div.length; i++) {
        edt_div[i].addEventListener("click", function (e) { modifyPriority(e, "high"); });
    }
    var edt_div = document.getElementsByClassName("priority-m");
    for (i = 0; i < edt_div.length; i++) {
        edt_div[i].addEventListener("click", function (e) { modifyPriority(e, "medium"); });
    }
    var edt_div = document.getElementsByClassName("priority-l");
    for (i = 0; i < edt_div.length; i++) {
        edt_div[i].addEventListener("click", function (e) { modifyPriority(e, "low"); });
    }
}

function addCheck(event) {
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    for (i = 0; i < allTask.length; i++) {
        if (p.innerHTML == allTask[i].title) {
            allTask[i].checked = !allTask[i].checked;
        }
    }
    createTask();
}

function delTask(event) {
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    index_to_del = 0;
    for (i = 0; i < allTask.length; i++) {
        if (p.innerHTML == allTask[i].title) {
            index_to_del = i;
            break;
        }
    }
    allTask.splice(index_to_del, 1);
    createTask();
}

function edtTask(event) {
    li = event.target.parentNode;
    p = li.getElementsByTagName("p")[0];
    inputBox.value = p.innerHTML;
    delTask(event);
}

function modifyPriority(event, priority){
    li = event.target.parentNode.parentNode.parentNode;
    p = li.getElementsByTagName("p")[0];
    for (i = 0; i < allTask.length; i++) {
        if (p.innerHTML == allTask[i].title) {
            allTask[i].priority = priority;
        }
    }
    createTask();
}