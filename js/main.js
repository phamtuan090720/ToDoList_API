var listTask = new TaskList();
var validation = new Validation();
getListTask();
getlocalstorage();

function getListTask() {
    listTask.getTastListService()
        .then(function(rs) {
            console.log(rs.data);
            setlocalstorage(rs.data);
            drawList(rs.data);
        })
        .catch(function(err) {
            console.log(err);
        })
};
getEle("addItem").addEventListener("click", function() {
    var taskname = getEle("newTask").value;
    var isValidation = true;
    isValidation &= validation.KiemTraRong("newTask", "notiInput", "(*)Không được để rỗng") && validation.KiemTraTrungTen("newTask", "notiInput", "(*)Không được Trùng Tên Task!", listTask.arr);
    console.log(isValidation);
    if (isValidation === 0) return;
    var task = new Task("", taskname, "todo");
    listTask.addTask(task).then(function(rs) {
            console.log(rs.data);
            alert("Add Success!");
            resetInput("newTask");
            getListTask();
        })
        .catch(function(err) {
            console.log(err);
            alert("Add Failed!");
        });
});

function deleteTask(id) {
    listTask.deleteTask(id)
        .then(function(rs) {
            console.log(rs.data);
            alert("DELETE Succsess!");
            getListTask();
        })
        .catch(function(err) {
            console.log(err);
            alert("Delete Failed");
        });
};

function drawList(listTask) {
    if (listTask) {
        var contentTodo = "";
        var contentCompleted = "";
        getEle("todo").innerHTML = "";
        getEle("completed").innerHTML = "";
        listTask.forEach(function(item) {
            if (item.status === "todo")
                contentTodo += renderListHtml(item);
            else if (item.status === "completed")
                contentCompleted += renderListHtml(item);
        });
        getEle("todo").innerHTML = contentTodo;
        getEle("completed").innerHTML = contentCompleted;
    }
};

function ChangeStatusTask(id) {

    listTask.getTaskById(id)
        .then(function(rs) {
            console.log(rs.data);
            if (rs.data.status === "todo") {
                var task = new Task(rs.data.id, rs.data.textTodo, "completed");

            } else {
                var task = new Task(rs.data.id, rs.data.textTodo, "todo");
            }
            listTask.upDateTask(task)
                .then(function(rs) {
                    console.log(rs.data);
                    alert("Change Status Success!");
                    getListTask();
                }).catch(function(err) {
                    alert("Change Status Failed!");
                    console.log(err);
                });
        })
        .catch(function(err) {
            alert("Change Status Failed!");
            console.log(err);
        });
};

function renderListHtml(task) {
    return `<li>
    <span>${task.textTodo}</span>
    <div class="button">
        <button class="remove"
        onclick="deleteTask(${task.id})">
        <i class="fa fa-trash-alt" ></i>
      </button>
        <button class="complete"
        onclick="ChangeStatusTask(${task.id})">
        <i class="fa fa-check-circle"></i>
      </button>
    </div>

</li>`;
};

function resetInput(id) {
    getEle(id).value = "";
};

function getEle(id) {
    return document.getElementById(id);
};

function getlocalstorage() {
    if (localStorage.getItem("ListTask")) {
        listTask.arr = JSON.parse(localStorage.getItem("ListTask"));
    }
};

function setlocalstorage(list) {
    localStorage.setItem("ListTask", JSON.stringify(list));
};