//Initialize objects
const http = new HTTP();
const ui = new UI();


//Event listeners
function loadEventListeners() {

    // Make the navbar transparent on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            document.querySelector('nav').style.opacity = 0.85;
        } else {
            document.querySelector('nav').style.opacity = 1;
        }
    });

    // Smooth Scrolling on click of btns "Home", "Users"
    $('#homeLink, #usersLink, .brand-logo, #usersLinkBtn').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate(
                {
                    scrollTop: $(hash).offset().top - 100
                },
                800
            );
        }
    });

    //Show users on page load
    document.addEventListener("DOMContentLoaded", loadUsers);

    //Show more
    document.querySelector("#usersSection").addEventListener("click", openModal);

    //Submit new user
    document.querySelector("#usersSection").addEventListener("click", addUser);


}


//Get avatar pics from tinyfac.es/api
async function getAvatarPics() {
    let response = await fetch('https://tinyfac.es/api/users');
    let data = await response.json();
    return data;
}

//Get users from jsonplaceholder api
async function loadUsers() {
    let avatarUrls = [];
    //Since jsonplaceholder has only 10 users in db we're limiting avatar pics arr to 10 els
    getAvatarPics().then(data => {
        data.forEach(function (x, index) {
            if (index < 10)
                avatarUrls.push(x.avatars[0].url);
        });
    }).catch(err => console.log(err));

    //Awaiting awatar pics api call to be finished before continuing
    await getAvatarPics();

    http.get("http://jsonplaceholder.typicode.com/users")
        .then(data => {
            //Pass the data to ui.ShowUsers fctions to display on page
            ui.showUsers(data, avatarUrls);
        })
        .catch(err => console.log(err));

    await http.get("http://jsonplaceholder.typicode.com/users");

    setMobileFriendlyContent();
}


//We will have three modals, and three modal triggers:
    // 1. show user info
    // 2. show user posts
    // 3. add new user
function openModal(e) {
    if (e.target.classList.contains("modal-trigger-1")) {

        (function ($) {
            $(function () {

                //initialize all modals           
                $('.modal').modal();

                //now you can open modal from code
                $('#modal1').modal('open');

            }); // end of document ready
        })(jQuery); // end of jQuery name space

        //Get userId and avatar photo id
        let userId = e.target.id;
        let imgId = e.target.parentElement.parentElement.children[0].children[0].src;
        populateModals(userId, imgId);

    } else if (e.target.classList.contains("modal-trigger-2")) {

        (function ($) {
            $(function () {

                //initialize all modals           
                $('.modal').modal();

                //now you can open modal from code
                $('#modal2').modal('open');

            }); // end of document ready
        })(jQuery); // end of jQuery name space

        let userId = e.target.id;
        populateModals(userId, null);

    } else if (e.target.classList.contains("modal-trigger-3")) {
        (function ($) {
            $(function () {

                //initialize all modals           
                $('.modal').modal();

                //now you can open modal from code
                $('#modal3').modal('open');

            }); // end of document ready
        })(jQuery); // end of jQuery name space

        populateModals(null, null, true);

    }
}

//Remove the modal div's content
function clearModal(modalId) {
    let modal = document.querySelector(`.modal-content-${modalId}`);
    let length = modal.childNodes.length
    for (let i = 0; i < length; i++) {
        modal.childNodes[i].remove();
    }
}

//Populate modals with info
async function populateModals(userId, imgId, addNewUser = false) {
    //If imgId is not null and addNewUser is false means it's user info modal
    if (imgId !== null && addNewUser === false) {
        //Modal id is 1 hence we're prefixing the value
        clearModal(1);
        let user;
        http.get("http://jsonplaceholder.typicode.com/users")
            .then(data => {
                data.forEach(function (x) {
                    //Searching for the desired user
                    if (x.id == userId) {
                        user = x;
                    }
                });
            })
            .catch(err => console.log(err));

        //Get the parent el 
        let parent = document.querySelector(".modal-content-1");
        let div = document.createElement("div");
        
        //await the http get to finish 
        await http.get("http://jsonplaceholder.typicode.com/users");
        
        //Form the output and set the innerhtml 
        let output = ui.populateModalInfo(user, null, imgId);
       
        div.innerHTML = output;
        parent.appendChild(div);

    } else if (imgId === null && addNewUser === false) {
        //If imdId is null and addNewUser is false means the show user posts btn has been clicked
        //Again, the value for the modal is 2 hence it's prefixed
        clearModal(2);
        let user;
        http.get("http://jsonplaceholder.typicode.com/users")
            .then(data => {
                data.forEach(function (x) {
                    if (x.id == userId) {
                        user = x;
                    }
                });
            })
            .catch(err => console.log(err));

        let parent = document.querySelector(".modal-content-2");
        let div = document.createElement("div");
        div.style.padding = "1rem";
        
        //await for the users get to finish
        await http.get("http://jsonplaceholder.typicode.com/users");
        
        let userPosts = [];
        //Get all of the user posts
        http.get(`http://jsonplaceholder.typicode.com/posts`)
        .then(data => {
            data.forEach(function (x) {
                if (x.userId === user.id) {
                    userPosts.push(x);
                }
            });
        })
        .catch(err => console.log(err));
        
        //await for the posts get to finish
        await http.get(`http://jsonplaceholder.typicode.com/posts`);
        
        //Form the output, set the innerhtml and append div to parent (modal)
        let output = ui.populateModalInfo(user, userPosts, null);

        div.innerHTML = output;
        parent.appendChild(div);

    } else if (addNewUser === true) {
        //If addNewUser is true we're displaying a form to add a new user in modal
        clearModal(3);
        let parent = document.querySelector(".modal-content-3");
        let div = document.createElement("div");
        div.style.padding = "1rem";

        let output = ui.populateModalInfo(null, null, null); 

        div.innerHTML = output;
        parent.appendChild(div);
    }

    setMobileFriendlyContent();
}

//Get all input values and return them
function getInputs(){
    const fullName = document.getElementById("name").value,
              email = document.getElementById("email").value,
              phone = document.getElementById("phone").value,
              city = document.getElementById("city").value;
    return {
        fullName,
        email,
        phone,
        city
    }
}

//Validate input fields
function validateInputs(){
        let inputs = getInputs();
        let window_weight = $(window).width();
        if((inputs.fullName === "" || inputs.email === "" || inputs.phone === "" || inputs.city === "") && window_weight > 700){
            ui.showMessage("Please fill in all fields!", "failed", true);
            return false;

        } else if (inputs.email.search("@") === -1 && window_weight > 700)
        {
            ui.showMessage("Please choose a valid email address!", "failed", true);
            return false;
        }
        else if((inputs.fullName === "" || inputs.email === "" || inputs.phone === "" || inputs.city === "") && window_weight <= 700)
        {
            ui.showMessage("Please fill in all fields!", "failed", true, true);
            return false;
        } else if (inputs.email.search("@") === -1 && window_weight <= 700)
        {
            ui.showMessage("Please choose a valid email address!", "failed", true, true);
            return false;
        }
    return true;
}

//add new user
async function addUser(e){
    if(e.target.classList.contains("userSubmit")){
        //Check if valid
        if(validateInputs()){
            let inputs = getInputs();
            //Create new user var from inputs
            const user = {
                name: inputs.fullName,
                email: inputs.email,
                phone: inputs.phone,
                city: inputs.city
            };
            //Post the data to server, server is going to return the newly added user, but it will not store it in their db
            http.post("http://jsonplaceholder.typicode.com/users", user)
                .then(data => {
                    ui.closeModal();
                    ui.showMessage("User successfully added!", "success");
                    ui.showNewUser(data);
                })
                .catch(err => console.log(err));
            
            await http.post("http://jsonplaceholder.typicode.com/users", user);

            setMobileFriendlyContent();
        }
    }
}

function setMobileFriendlyContent(){
    let window_weight = $(window).width();
    if (window_weight <= 700) {
        //Set the user display boxes to full width
        let userBox = document.getElementsByClassName("userBox");
        userBox = Array.from(userBox);
        userBox.forEach(function(x){
            x.className = "col s12 userBox";

        });

        //Set the img width and height to smaller vals, and make it full width, and also make inputs div full width
        let imgsInModal = document.getElementsByClassName("imgClsModal");
        imgsInModal = Array.from(imgsInModal);
        imgsInModal.forEach(function(x){
            x.style.width = "150px";
            x.style.height = "200px";
            x.parentElement.className = "col s12";
            x.parentElement.nextSibling.nextSibling.className = "col s12";
        });

    } 
    else {
        let userBox = document.getElementsByClassName("userBox");
        userBox = Array.from(userBox);
        userBox.forEach(function(x){
            x.className = "col s6 m6 userBox";

        });

        let imgsInModal = document.getElementsByClassName("imgClsModal");
        imgsInModal = Array.from(imgsInModal);
        imgsInModal.forEach(function(x){
            x.style.width = "200px";
            x.style.height = "160px";
            x.parentElement.className = "col s6";
            x.parentElement.nextSibling.nextSibling.className = "col s6";
        });

    }

    if(window_weight <= 1000){
        //Remove userBox's show posts btn
        let showPosts = document.getElementsByClassName("postsByUser");
        showPosts = Array.from(showPosts);
        showPosts.forEach(function(x){
            x.style.display = "none";
        });
    } else {
        let showPosts = document.getElementsByClassName("postsByUser");
        showPosts = Array.from(showPosts);
        showPosts.forEach(function(x){
            x.style.display = "block";
        });
    }
}

function main() {

    loadEventListeners();
}

//run main
main();