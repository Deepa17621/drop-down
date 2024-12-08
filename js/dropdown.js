const usersList = document.querySelectorAll(".users"),
    userInput = document.querySelector("#user-inpt"),
    dropdownWrapper = document.querySelector(".dropdown-wrapper");

userInput.value = "Select Users";

usersList.forEach(user => {
    user.addEventListener("click", (e) => {
        e.preventDefault();
        let checkBox = user.querySelector(".check-box").children;
        let clickedEle = document.querySelectorAll(".checked");

        if (checkBox[0].classList.contains("checked")) {
            checkBox[0].classList.toggle("checked");
        }
        else if (clickedEle.length >= 5) {
            alert("Maximum users selected!");
            return;
        }
        else {
            checkBox[0].classList.toggle("checked");
        }
        //update selected Count
        clickedEle = document.querySelectorAll(".checked");
        if (clickedEle.length >=0 && clickedEle.length <= 2) {
            userInput.value = "Select Users";
        } else {
            userInput.value = `${clickedEle.length} user${clickedEle.length > 1 ? "s" : ""} Selected`;
        }
    });
});
