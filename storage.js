class Storage {

    static getSearchedUsersFromStorage(){
        //Get All Users From Storage
        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        }else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUsersToStorage(username){
        //Add Users to Storage

        let users = this.getSearchedUsersFromStorage(); //take an array from storage
        
        if (users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));

    }

    static clearAllSearchedUsersFromStorage(){
        // Clear All Users from Storage

        localStorage.removeItem("searched");
    }
}