let userListWrapperUL = document.querySelector(".user-list");

const userList = {
    "Hattori": `<img src="./assets/hattori.jpg" alt="">`,
    "Kenichi": `<img src="./assets/Kenichi.webp" alt="">`,
    "Shinsho": `<img src="./assets/shinsho.jpg" alt="">`,
    "Shishimaru": `<i class="fa-solid fa-user"></i>`,
    "Kemumaki": `<img src="./assets/kemumaki.jpg" alt="">`,
    "Yumiko": `<img src="./assets/yumiko.jpg" alt="">`,
    "Shincha": `<img src="./assets/shinchan.jpg" alt="">`,
    "Himawari": `<img src="./assets/himawari.jpg" alt="">`,
    "DoluBolu": `<img src="./assets/Dholu.webp" alt="">`,
    "Heidi": `<img src="./assets/heidi.jpg" alt="">`
}
let savedUsersArr = new Set();

//Configure Drop-Down menu
function addUsersToList(userList) {
    for (const key in userList) {
        let li = document.createElement("li");
        li.setAttribute("class", "user");
        li.setAttribute("id", `"${key}"`);
        let template = `<span class="user-profile">${userList[key]}</span>
                        <span class="user-name">${key}</span>
                        <span class="check-box" tabindex="0">
                            <i class="fa-solid fa-check"></i>                            
                        </span>`;
        li.innerHTML = template;
        userListWrapperUL.appendChild(li);
    }
}

addUsersToList(userList); //Execution starts from here

function dropdownToggle() {
    if (chevron.classList.contains("fa-rotate-180")) {
        wrapperForDrpDwnAndBtn.classList.remove("show");
    }
    else {
        wrapperForDrpDwnAndBtn.classList.add("show");
    }
}

const usersList = document.querySelectorAll(".user"),
    userInput = document.querySelector("#user-inpt"),
    dropdownWrapper = document.querySelector(".dropdown-wrapper"),
    wrapperForDrpDwnAndBtn = document.querySelector(".wrap-drpdwn-btn"),
    searchUser = document.querySelector("#search-bar"),
    chevron = document.querySelector(".chevron"),
    tagsContainer = document.querySelector(".tags-container");
let remainingCount = document.querySelector(".remaining-user-count");
let notFound = document.querySelector("#not-found");

userInput.textContent = "Select Users";

chevron.classList.add("fa-rotate-180");  //Initial position of chevron
dropdownToggle();

//user-inpt container - click event and change border colr based on display
(document.querySelector(".get-inpt-wrapper")).addEventListener("click", (e) => {
    e.stopPropagation();
    chevron.classList.toggle("fa-rotate-180");
    let inpWrapper = (document.querySelector(".get-inpt-wrapper"));
    if (!chevron.classList.contains("fa-rotate-180")) {
        inpWrapper.style.cssText = `border: 1px solid rgb(233, 151, 10);
                                  outline: 1px solid rgb(237, 155, 13);`
    }
    else {
        inpWrapper.style.cssText = `border: none;
                                    outline: none;`;
    }
    dropdownToggle();
    e.stopPropagation();
});

searchUser.addEventListener("input", (e) => {
    e.preventDefault();
    let filteredItem = (Object.entries(userList)).filter(user => {
        // userListWrapperUL.innerHTML = "";
        if (user[0].toLowerCase().includes(searchUser.value.toLowerCase())) {
            return user;
        }
    });
    if (filteredItem.length !== 0) {
        if(notFound.classList.contains("notfound")){
            notFound.classList.remove("notfound");
        }
        usersList.forEach(element => {
            element.style.display = "none";
        });
        filteredItem.forEach(filtered => {
            usersList.forEach(existing => {
                if(filtered[0].toLowerCase().includes(existing.querySelector(".user-name").textContent.toLowerCase())){
                    existing.style.display= "flex";
                }
            });
        });
    }
    else {
        usersList.forEach(element => {
            element.style.display = "none";
        });
        notFound.classList.add("notfound");
    }
    
});

//buttons
const doneBtn = document.querySelector("#done-btn"),
    clearBtn = document.querySelector("#clr-btn"),
    clearAllBtn = document.querySelector("#clr-all-btn");

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    wrapperForDrpDwnAndBtn.classList.remove("show");
    chevron.classList.add("fa-rotate-180");
    if(savedUsersArr.length!==0){
        savedUsersArr.forEach(li => {
            li.querySelector(".check-box").children[0].classList.add("checked");
        });
    }
    searchUser.value ="";
});

clearAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let selectedUsers = document.querySelectorAll(".checked");
    selectedUsers.forEach(selectedUser => {
        selectedUser.classList.remove("checked");
    });
    if(document.querySelectorAll(".tag").length>0){
        userInput.textContent = "";
    }
    else{
        userInput.textContent = "Select Users";
    }
    searchUser.value=""
});

//select user - Event
function selectUserFunc(usersMenu) {
    usersMenu.forEach(user => {
        user.addEventListener("click", (e) => {
            e.preventDefault();
            let tags = document.querySelectorAll(".tag");
            if(tags.length>0){
                tags.forEach(element => {
                    if(element) element.remove()
                });
            }
            remainingCount.textContent = "";
            let checkBox = user.querySelector(".check-box").children;
            let clickedEle = document.querySelectorAll(".checked");

            if (checkBox[0].classList.contains("checked")) {
                checkBox[0].classList.toggle("checked");
                updateHeaderBeforeDone();
            }
            else if (clickedEle.length >= 5) {
                (document.querySelectorAll(".user")).forEach(element => {
                    if (!checkBox[0].classList.contains("checked")) {
                        // if (document.querySelectorAll(".checked").length > 5) {
                        //     element.style.cursor = element.querySelector(".checked") ? "pointer" : "not-allowed";
                        // }
                        showToast('Maximum users selected!');
                    }
                });
            }
            else {
                checkBox[0].classList.toggle("checked");
            }
            updateHeaderBeforeDone();        
        });
    });
}
selectUserFunc(usersList);

function updateHeaderBeforeDone() {
    let clickedEle = document.querySelectorAll(".checked");
    if (clickedEle.length >=0) {
        // userInput.textContent = "Select Users";
        userInput.textContent = `${clickedEle.length} user${clickedEle.length > 1 ? "s" : ""} Selected`;
    }
    if(clickedEle.length ==0 ) userInput.textContent = "Select Users";
}

function updateRemainingCount(selectedUsers) {
    let remaining = document.querySelector(".remaining-user-count");
    if (selectedUsers.length > 2) {
        remaining.style.visibility="visible";
        remaining.innerHTML = `<span class="count">+${selectedUsers.length - 2}</span>`;
        remaining.style.backgroundColor = "rgba(224, 122, 85, 0.929)";
    }
    else{
        remaining.innerHTML = "";
        remaining.style.visibility="hidden";
    }
}
doneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    chevron.classList.add("fa-rotate-180");
    dropdownToggle();

    let selectedUsers = document.querySelectorAll(".checked");
    if (selectedUsers.length === 0) {
        location.reload()
    }
    let userArr = {};
    if(tagsContainer.contains(userInput)) userInput.textContent=""; 
    selectedUsers.forEach(selectedChild => {
        let user = selectedChild.closest(".user");
        userArr[user.querySelector(".user-name").textContent] = selectedChild;
        savedUsersArr.add(user);
    });
    updateRemainingCount(selectedUsers);
    let tags = document.querySelectorAll(".tag");
    tags.forEach(element => {
        if(element){
            element.remove()
        }
    });
    for (const userName in userArr) {
        if (Object.entries(userArr).length == 0) return;
        if((Object.keys(userArr)).indexOf(userName) == 2) return;
        addTag(userName, userArr[userName], (Object.keys(userArr)).indexOf(userName));
    }
    searchUser.value="";
});

remainingCount.addEventListener("click", (e) => {
    e.preventDefault();
    let selectedUser = document.querySelectorAll(".checked");
    let arr = []
    selectedUser.forEach(element => {
        let user = element.closest(".user");
        arr.push(user.querySelector(".user-name"));
    });
});
function addTag(userName, tagParent) {
    userInput.textContent = ""
    const tagElement = document.createElement("div");
    tagElement.className = `tag`;
    tagElement.innerHTML = `${userName} <span class="remove-tag">&times;</span>`;

    tagsContainer.appendChild(tagElement);

    tagElement.querySelector(".remove-tag").addEventListener("click", (e) => {
        // e.preventDefault();
        tagParent.classList.remove("checked");
        remove(tagElement);
        updateInputTag();
        updateRemainingCount(document.querySelectorAll(".checked"));
        e.stopPropagation();
    });
}

function remove(element) {
    tagsContainer.removeChild(element);
}

function updateInputTag() {   // Need To Update Here.............!
    let remaining = document.querySelector(".remaining-user-count");
    let currentCheckedEle = document.querySelectorAll(".checked");
    let count = remaining.querySelector(".count");

    let actualRemainingCount;
    if (count != null) {
        actualRemainingCount = (count.innerHTML).slice(0);
    }
    if (currentCheckedEle.length <= 2) {
        remaining.style.visibility = "hidden";
        let tags = document.querySelectorAll(".tag");
        tags.forEach(element => {
            if(element){
                element.remove()
            }
        });
        currentCheckedEle.forEach(element => {
            if (currentCheckedEle.length == 0) return;
            addTag(element.closest(".user").querySelector(".user-name").textContent, element);
        });
    }
    else if (currentCheckedEle.length > 2) {
        let tags = document.querySelectorAll(".tag");
        tags.forEach(element => {
            if(element){
                element.remove()
            }
        });
        for (let i = 0; i < currentCheckedEle.length; i++) {
            if(i==2) break;
            addTag((currentCheckedEle[i].closest(".user")).querySelector(".user-name").textContent, currentCheckedEle[i]);
        }
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show'); 
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}
