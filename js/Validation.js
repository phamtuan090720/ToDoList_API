function Validation() {
    this.KiemTraRong = function(idInput, idNoti, mess) {
        if (getEle(idInput).value === "") {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        } else {
            getEle(idNoti).style.display = "none";
            return true;
        }

    };
    this.KiemTraTrungTen = function(idInput, idNoti, mess, arr) {
        var isTrung = false;
        isTrung = arr.some(function(item) {
            return item.textTodo === getEle(idInput).value;
        });
        if (isTrung) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        } else {
            getEle(idNoti).style.display = "none";
            return true;
        }
    };
}