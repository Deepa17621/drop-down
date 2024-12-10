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
//Configure Drop-Down 
function addUsersToList(userList) {
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

addUsersToList(userList); //Execution starts from here

function dropdownToggle() {
    if (chevron.classList.contains("fa-rotate-180")) {
        wrapperForDrpDwnAndBtn.style.display = "none";
    }
    else {
        wrapperForDrpDwnAndBtn.style.display = "block"
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

chevron.classList.add("fa-rotate-180");  //Initial position of chevron
dropdownToggle(); 

chevron.addEventListener("click", (e) => {
    e.preventDefault();
    chevron.classList.toggle("fa-rotate-180");
    let inpWrapper = (document.querySelector(".get-inpt-wrapper"));
    if(!chevron.classList.contains("fa-rotate-180")){
        console.log("deepa");
        inpWrapper.style.cssText=`border: 1px solid rgb(233, 151, 10);
                                  outline: 1px solid rgb(237, 155, 13);`
    }
    else{
        inpWrapper.style.cssText=`border: none;
                                outline: none;`;
    }
    dropdownToggle();
});



searchUser.addEventListener("input", (e) => {
    e.preventDefault();
    userListWrapperUL.innerHTML = "";
    for (const name in userList) {
        if((e.target.value)===name){
            let li = document.createElement("li");
            li.setAttribute("class", "user");
            let template = `<span class="user-profile">${userList[name]}</span>
                            <span class="user-name">${name}</span>
                            <span class="check-box">
                                <i class="fa-solid fa-check"></i>                            
                            </span>`;
            li.innerHTML = template;
            userListWrapperUL.appendChild(li);
        }
    }
    selectUserFunc();
    // searchUser.value = "";
    if(document.activeElement!==searchUser){
        addUsersToList(userList);
    }
});
//buttons
const doneBtn = document.querySelector("#done-btn"),
    clearBtn = document.querySelector("#clr-btn"),
    clearAllBtn = document.querySelector("#clr-all-btn");

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    wrapperForDrpDwnAndBtn.style.display = "none";
    chevron.classList.add("fa-rotate-180");
    location.reload();
});

userInput.placeholder = "Select Users";

//select user - Event
function selectUserFunc() {
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
            if (clickedEle.length >= 0 && clickedEle.length <= 2) {
                userInput.placeholder = "Select Users";
            } else {
                userInput.placeholder = `${clickedEle.length} user${clickedEle.length > 1 ? "s" : ""} Selected`;
            }
        });
    });
}
selectUserFunc(usersList);

clearAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let selectedUsers = document.querySelectorAll(".checked");
    selectedUsers.forEach(selectedUser => {
        selectedUser.classList.remove("checked");
    });
    remainingCount.innerHTML = "";
    remainingCount.style.backgroundColor = "white"
    tagsContainer.innerHTML = "";
    userInput.placeholder = "Select Users";
});
function updateRemainingCount(selectedUsers) {
    if (selectedUsers.length > 2) {
        let remaining = document.querySelector(".remaining-user-count");
        remaining.innerHTML = `<span class="count">+${selectedUsers.length - 2}</span> <i class="fa-solid fa-xmark"></i>`;
        remaining.style.backgroundColor = "rgba(224, 122, 85, 0.929)";
    }
}
doneBtn.addEventListener("click", (e) => {
    e.preventDefault();

    chevron.classList.add("fa-rotate-180");
    dropdownToggle();

    let selectedUsers = document.querySelectorAll(".checked");
    if(selectedUsers.length==0){
        alert("No Users Selected!");
        return;
    }
    let userArr = {};

    selectedUsers.forEach(selectedChild => {
        let user = selectedChild.closest(".user");
        userArr[user.querySelector(".user-name").textContent] = selectedChild;
    });
    updateRemainingCount(selectedUsers);
    let tagCount = 0;
    for (const userName in userArr) {
        if (tagCount > 1) {
            return
        }
        if (Object.entries(userArr).length == 0) return;
        tagCount++;
        let removedUser = addTag(userName, userArr[userName], (Object.keys(userArr)).indexOf(userName));
    }
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

    if(tagsContainer.children.length==2) return;

    userInput.value = "";
    userInput.placeholder = ""
    const tagElement = document.createElement("div");
    tagElement.className = `tag`;
    tagElement.innerHTML = `${userName} <span class="remove-tag">&times;</span>`;

    tagsContainer.appendChild(tagElement);

    tagElement.querySelector(".remove-tag").addEventListener("click", (e) => {
        tagParent.classList.remove("checked");
        remove(tagElement);
        updateInputTag();
        updateRemainingCount(document.querySelectorAll(".checked"));
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
    if(count!=null){
        actualRemainingCount = (count.innerHTML).slice(0);
    }
    if(currentCheckedEle.length<=2){
        remaining.innerHTML = "";
        tagsContainer.innerHTML = "";
        currentCheckedEle.forEach(element => {
            addTag(element.closest(".user").querySelector(".user-name").textContent, element);
        });
    }
    else if(currentCheckedEle.length>2 ) {
        let tagCount = 0;
        currentCheckedEle.forEach(element => {
            if(tagCount>2) return
            addTag((element.closest(".user")).querySelector(".user-name").textContent, element);
            tagCount++;
        });
    }
}
