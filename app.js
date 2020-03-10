//Choosing Elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();




eventListeners();


function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched); 
}

function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lutfen gecerli bir kullanici adi girin");
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Lutfen Gecerli Bir Kullanici Adi Giriniz...");    
            }else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }


    ui.clearInput(); //Clear Inputs
    e.preventDefault();
    
}
function clearAllSearched(){
    //Clear All Searched
    if(confirm("Emin Misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}


function getAllSearched(){
    //when page updated take data from storage and add to UI
    
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
    result += `
    <li class="list-group-item">${user}</li>
    `;
    
    });

    lastUsers.innerHTML = result;
    
   

}