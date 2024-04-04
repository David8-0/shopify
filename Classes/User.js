export class User{
    constructor(name,id,email,isNormal){
        this.name = name;
        this.id = id;
        this.email = email;
        this.isNormal = isNormal;
        this.favorites=[];
        this.cart=[];
        this.history=[];

        //handle local storage
        if(localStorage.getItem(`users`) !=null){
            let users =JSON.parse(localStorage.getItem(`users`));
            //check if user exists
            let isNewUser=true;
            let existedUser
            users.forEach(function(user,index){
                if(user.id == id){
                    isNewUser=false;
                    existedUser=users[index];
                }
            });
            if(isNewUser){
                users.push(this);
                localStorage.setItem('currentUser', JSON.stringify(this));
            }else{
                localStorage.setItem('currentUser', JSON.stringify(existedUser));
            }
            
            localStorage.setItem('users', JSON.stringify(users));
        }else{
            //first user
            let users=[];
            users.push(this);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(this));
        }

    }

    static getCurrentUser(){
        if(localStorage.getItem(`currentUser`) !=null){
            return JSON.parse(localStorage.getItem(`currentUser`));
        }else{
            return null;
        }
    }
    static getUsers(){
        if(localStorage.getItem(`users`) !=null){
            let users=JSON.parse(localStorage.getItem(`users`));
            return users;
        }else{
            return null;
        }
    }
    static logOut(){
        if(localStorage.getItem('currentUser')==null)
            throw new Error("no user logged in to be logged out");
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if(!user.isNormal){
            fetch(`https://www.googleapis.com/revoke=${info['access_token']}`,{
                method:'POST',
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                },
                mode: 'no-cors'
            })
            .then((data)=>{
                location.href = "http://127.0.0.1:5500/login.html";
                localStorage.removeItem('authInfo');
                User.logOut();
            })
        location.href = "http://127.0.0.1:5500/login.html";
        localStorage.setItem(`currentUser`,null);
        }
    }
    // to be called after any update to the current user
    static updateUsers(){
        if(localStorage.getItem(`users`) !=null && localStorage.getItem(`currentUser`) !=null){
            
            let users=JSON.parse(localStorage.getItem(`users`));
            let currentUser=JSON.parse(localStorage.getItem(`currentUser`));
            console.log(currentUser);
            let indexOfCurrentUser = -1;
            users.forEach((element,index)=>{
                if(element.id == currentUser.id){
                    indexOfCurrentUser=index;
                }
            });
            if(indexOfCurrentUser>-1){
                users.splice(indexOfCurrentUser,1,currentUser);
            }
            localStorage.setItem('users',JSON.stringify(users))
        }
    }
    static addToFavorits(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        // if(currentUser?.favorites.length>0){
            currentUser.favorites?.forEach((element)=>{
                if(element==productId){
                    throw new Error("Product already in favorites");
                }
            });
        // }
        currentUser.favorites.push(productId);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
    static removeFromFavorits(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
        let productIndex=currentUser.favorites.indexOf(productId);
        if(productIndex==-1)
            throw new Error("Product doesn't exist in favorites");
        currentUser.favorites.splice(productIndex, 1);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
    static addToCart(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
            currentUser.cart?.forEach((element)=>{
                if(element==productId){
                    throw new Error("Product already in cart");
                }
            });
        currentUser.cart.push(productId);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
    static removeFromCart(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
        let productIndex=currentUser.cart.indexOf(productId);
        if(productIndex==-1)
            throw new Error("Product doesn't exist in cart");
        currentUser.cart.splice(productIndex, 1);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
    static addToHistory(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
            currentUser.history?.forEach((element)=>{
                if(element==productId){
                    throw new Error("Product already in history");
                }
            });
        currentUser.history.push(productId);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
    static removeFromHistory(productId){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'));
        let productIndex=currentUser.history.indexOf(productId);
        if(productIndex==-1)
            throw new Error("Product doesn't exist in history");
        currentUser.history.splice(productIndex, 1);
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        User.updateUsers();
    }
}