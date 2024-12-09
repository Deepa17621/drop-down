let userListWrapperUL = document.querySelector(".user-list");

// To List Down the Dynamically - User Name with user display picture
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

addUsersToList(); //Execution starts from here

const usersList = document.querySelectorAll(".user"),
    userInput = document.querySelector("#user-inpt"),
    dropdownWrapper = document.querySelector(".dropdown-wrapper"),
    wrapperForDrpDwnAndBtn = document.querySelector(".wrap-drpdwn-btn"),
    searchUser = document.querySelector("#search-bar"),
    chevron = document.querySelector(".chevron"),
    tagsContainer = document.querySelector(".tags-container");

//Default Chevron - Display/close dropdown
// if(chevron.children[0].classList.contains("fa-rotate-180")){
//     wrapperForDrpDwnAndBtn.style.display="none";
// }

chevron.classList.add("fa-rotate-180");
if(chevron.classList.contains("fa-rotate-180")){
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

//select user - Event
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
    if(userArr.length>2){
        let remaining = document.querySelector(".remaining-user-count");
        remaining.innerHTML = `<span class="count">+${userArr.length-2}</span> <i class="fa-solid fa-xmark"></i>`;
        remaining.style.backgroundColor="rgba(224, 122, 85, 0.929)";
    }
    for (let i = 0; i < 2; i++) {
        addTag(userArr[i]);
    }
    
});

let remainingCount = document.querySelector(".remaining-user-count");
remainingCount.addEventListener("click", (e)=>{
    e.preventDefault();
    let selectedUser = document.querySelectorAll(".checked");
    let arr = []
    selectedUser.forEach(element => {
        let user = element.closest(".user");
        arr.push(user.querySelector(".user-name"));
    });
});

function addTag(tag) {
    
        // Create tag element
        const tagElement = document.createElement("div");
        tagElement.className = "tag";
        tagElement.innerHTML = `${tag} <span class="remove-tag">&times;</span>`;

        // Append to tags container
        tagsContainer.appendChild(tagElement);

        // Add event listener to remove tag
        tagElement.querySelector(".remove-tag").addEventListener("click", () => {
            removeTag(tag, tagElement);
        });
        userInput.value = "";
}

function removeTag(tag, element) {
    tagsContainer.removeChild(element);
}