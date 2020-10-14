function TaskList() {
    this.arr = [];
    this.getTastListService = function() {
        return axios({
            url: "https://5f827179069572001643369d.mockapi.io/api/Task",
            method: "GET",
        });
    };
    this.deleteTask = function(id) {
        return axios({
            url: "https://5f827179069572001643369d.mockapi.io/api/Task/" + id,
            method: "DELETE"
        });
    };
    this.addTask = function(task) {
        return axios({
            url: "https://5f827179069572001643369d.mockapi.io/api/Task",
            method: "POST",
            data: task,
        });
    };
    this.getTaskById = function(id) {
        return axios({
            url: "https://5f827179069572001643369d.mockapi.io/api/Task/" + id,
            method: "GET"
        });
    };
    this.upDateTask = function(task) {
        return axios({
            url: "https://5f827179069572001643369d.mockapi.io/api/Task/" + task.id,
            method: "PUT",
            data: task,
        });
    };
}