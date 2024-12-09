let userListWrapperUL = document.querySelector(".user-list");

const userList={
    "Hattori": `<img src="./assets/hattori.jpg" alt="">`,
    "Kenichi": `<img src="./assets/Kenichi.webp" alt="">`,
    "Shinsho":  `<img src="./assets/shinsho.jpg" alt="">`,
    "Shishimaru": `<i class="fa-solid fa-user"></i>`,
    "Kemumaki": `<img src="./assets/kemumaki.jpg" alt="">`,
    "Yumiko": `<img src="./assets/yumiko.jpg" alt="">`,
    "Shincha": `<img src="./assets/shinchan.jpg" alt="">`,
    "Himawari": `<img src="./assets/himawari.jpg" alt="">`,
    "DoluBolu": `<img src="./assets/Dholu.webp" alt="">`,
    "Heidi": `<img src="./assets/heidi.jpg" alt="">`
}
//Configure Drop-Down 
function addUsersToList() {
    for (const key in userList) {
        let li = document.createElement("li");
        li.setAttribute("class", "user");
        let template = `<span class="user-profile">${userList[key]}</span>
                        <span class="user-name">${key}</span>
                        <span class="check-box">
                            <i class="fa-solid fa-check"></i>                            
                        </span>`;
        li.innerHTML = template;
        userListWrapperUL.appendChild(li);
    }
    
}
addUsersToList();

const usersList = document.querySelectorAll(".user"),
    userInput = document.querySelector("#user-inpt"),
    dropdownWrapper = document.querySelector(".dropdown-wrapper"),
    wrapperForDrpDwnAndBtn = document.querySelector(".wrap-drpdwn-btn"),
    searchUser = document.querySelector("#search-bar"),
    chevron = document.querySelector(".chevron");

if(chevron.children[0].classList.contains("fa-rotate-180")){
    wrapperForDrpDwnAndBtn.style.display="none";
}

chevron.addEventListener("click", (e)=>{
    e.preventDefault();
    chevron.classList.toggle("fa-rotate-180");
    if(chevron.classList.contains("fa-rotate-180")){
        wrapperForDrpDwnAndBtn.style.display="none";
    }
    else {
        wrapperForDrpDwnAndBtn.style.display="block"
    }
})

searchUser.addEventListener("input", (e)=>{
    e.preventDefault();
    for (const userName in userList) {
        if((e.target.value) == userName){
            let li = document.createElement("li");
            li.setAttribute("class", "user");
            let template = `<span class="user-profile">${userList[userName]}</span>
                            <span class="user-name">${userName}</span>
                            <span class="check-box">
                                <i class="fa-solid fa-check"></i>                            
                            </span>`;
            li.innerHTML = template;
            userListWrapperUL.appendChild(li);
        }
    }
})

//buttons
const doneBtn = document.querySelector("#done-btn"),
      clearBtn = document.querySelector("#clr-btn"),
      clearAllBtn = document.querySelector("#clr-all-btn");

clearBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    wrapperForDrpDwnAndBtn.style.display="none";
    chevron.classList.add("fa-rotate-180")
});

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

clearAllBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let selectedUsers = document.querySelectorAll(".checked");
    selectedUsers.forEach(selectedUser => {
        selectedUser.classList.remove("checked");
    });
    userInput.value = "Select Users";
});

doneBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    wrapperForDrpDwnAndBtn.style.display = "none"
    let selectedUsers = document.querySelectorAll(".checked");
    let userArr = [];
    selectedUsers.forEach(selectedChild => {
        let user = selectedChild.closest(".user");
        userArr.push(user.querySelector(".user-name").textContent)
    });
    
})
