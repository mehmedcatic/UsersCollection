

class UI {

    //Display newly added user to the UI
    showNewUser(user){
        //Get the el to insert new user after
        const insertAfterEl = document.querySelector("#userListDiv").firstChild.nextSibling;
        let userDiv = document.createElement("div");
        userDiv.className = "col s6 m6 userBox";
        let output = `
            <div class="card">
                <div class="card-content" style="border: 2px solid green;">
                <div class="row">
                    <div class="col s12">
                        <img class="imgCls" alt="Not found" src="./img/newUserAvatar.png">
                    </div>

                    <div class="form-group col s6">
                        <label for="name-${user.id}">Name</label>
                        <input id="name-${user.id}" value="${user.name}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s6">
                        <label for="email-${user.id}">Email</label>
                        <input id="email-${user.id}" value="${user.email}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s6">
                        <label for="phone-${user.id}">Phone</label>
                        <input id="phone-${user.id}" value="${user.phone}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s6">
                        <label for="city-${user.id}">City</label>
                        <input id="city-${user.id}" value="${user.city}" type="text" class="form-control">
                    </div>
                    <div class="col s12" style="margin-top: 0.7rem; background: #0277bd; color: #fff; padding: 0.5rem;">
                        <p>This is a custom created user.</p>
                    </div>
                    <div class="col s12" style="margin-top: 0.7rem; background: #0277bd; color: #fff; padding: 0.5rem;">
                        <p> It will be removed after you refresh the page!</p>
                    </div>
                </div>

                </div>
            </div>
        `;
        userDiv.innerHTML = output;
        insertAfterEl.parentNode.insertBefore(userDiv, insertAfterEl.nextSibling);
    }

    //Show users from jsonplaceholder api in UI
    showUsers(users, avatars) {
        let userList = document.createElement("div");
        userList.className = "row";
        userList.id = "userListDiv";
        let output = `
            <div style="text-align: right; padding-right: 1rem; margin-bottom: 0.6rem;"> 
                <a class="btn modal-trigger-3" id="addUserBtn">ADD A NEW USER</a>
            </div>
        `;
        //Loop through all of the users and avatars and create their display
        for (let i = 0; i < users.length; i++) {
            output +=
                `
            <div class="col s6 m6 userBox">
                <div class="card">
                    <div class="card-content">
                    <div class="row">
                        <div class="col s12">
                            <img class="imgCls" alt="Not found" src="${avatars[i]}">
                        </div>

                        <div class="form-group col s6">
                            <label for="name-${users[i].id}">Name</label>
                            <input id="name-${users[i].id}" value="${users[i].name}" type="text" class="form-control">
                        </div>
                        <div class="form-group col s6">
                            <label for="email-${users[i].id}">Email</label>
                            <input id="email-${users[i].id}" value="${users[i].email}" type="text" class="form-control">
                        </div>
                        <div class="form-group col s6">
                            <label for="phone-${users[i].id}">Phone</label>
                            <input id="phone-${users[i].id}" value="${users[i].phone}" type="text" class="form-control">
                        </div>
                        <div class="form-group col s6">
                            <label for="city-${users[i].id}">City</label>
                            <input id="city-${users[i].id}" value="${users[i].address.city}" type="text" class="form-control">
                        </div>
                        <div class="form-group align-center col s12">
                            <label for="created_at_lt">&nbsp;</label>
                            <input type="submit" value="user info" class="btn form-control modal-trigger-1" id="${users[i].id}" style="width:100%; background: #0277bd; border-radius: 5px;" data-target="modal1"/>
                        </div>
                        <div class="form-group align-center col s12 postsByUser">
                            <input type="submit" value="posts made by user" class="btn form-control modal-trigger-2" id="${users[i].id}" style="width:100%; background: #29b6f6; border-radius: 5px; margin-top: 0.5rem;" data-target="modal2"/>
                        </div>
                        
                    </div>

                    </div>
                </div>
            </div>
            `;

        }

        //Add three modals 
        output += `
        <div id="modal1" class="modal">
            <div class="modal-content-1">
            </div>
            <div class="modal-footer" style="padding-right: 1.5rem">
                <a href="#!" class="modal-close waves-effect waves-green btn btn-flat white-text">DISMISS</a>
            </div>
        </div>

        <div id="modal2" class="modal">
            <div class="modal-content-2">
            </div>
            <div class="modal-footer" style="padding-right: 1.5rem;">
                <a href="#!" class="white-text modal-close waves-effect waves-green btn btn-flat">DISMISS</a>
            </div>
        </div>

        <div id="modal3" class="modal">
            <div class="modal-content-3">
            </div>
            <div class="modal-footer" style="padding-right: 1.5rem;">
                <a href="#!" class="white-text modal-close waves-effect waves-green btn btn-flat">DISMISS</a>
            </div>
        </div>
        `;

        userList.innerHTML = output;

        document.getElementById("usersSection").appendChild(userList);
    }

    //Show modal data in the UI
    populateModalInfo(user, userPosts, imgId) {
        let output = "";
        //Check if it's userInfo modal we need to display
        if (userPosts === null && imgId !== null) {
            output = `
           <div class="row">
                <h4 class="center" style="border-bottom: 1px solid rgba(0,0,0,0.1); margin: 1rem 0 2rem 0; padding-bottom: 1rem; color: #0277bd; font-weight: 650;">USER INFO</h4>
                <div class="col s6">
                    <img class="imgClsModal" alt="Not found" src="${imgId}">
                </div>
                <div class="col s6">
                    <div class="form-group col s12">
                        <label for="name-${user.id}">Name</label>
                        <input id="name-${user.id}" value="${user.name}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s12">
                        <label for="email-${user.id}">Email</label>
                        <input id="email-${user.id}" value="${user.email}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s12">
                        <label for="phone-${user.id}">Phone</label>
                        <input id="phone-${user.id}" value="${user.phone}" type="text" class="form-control">
                    </div>
                    <div class="form-group col s12">
                        <label for="city-${user.id}">City</label>
                        <input id="city-${user.id}" value="${user.address.city}" type="text" class="form-control">
                    </div>
                </div>
                
           
             </div>
           `;
        } else if (user !== null && userPosts !== null) {
            //User posts
            //Create the table and fill it with content
            output = `
            <h4 class="center" style="border-bottom: 1px solid rgba(0,0,0,0.1); margin: 1rem 0 2rem 0; padding-bottom: 1rem; color: #0277bd; font-weight: 650; letter-spacing: -3px;">Posts made by: <span style="color: black;">${user.name}</span></h4>
            
            <table class="striped centered responsive-table">
                <thead>
                    <tr>
                        <th class="t1">ID</th>
                        <th class="t2">Title</th>
                        <th class="t3">Body</th>
                    </tr>
                </thead>
                <tbody>
            `;

            userPosts.forEach(function (x) {
                output += `
                        <tr>
                            <td>${x.id}</td>
                            <td>${x.title}</td>
                            <td>${x.body}</td>
                        </tr>
                        
                        `;
            });

            output += `
                </tbody>
                </table>
            `;

        } else {
            //New user modal
            //Create the input fields
            output = `
            <div class="row formDiv">
                 <h4 class="center" style="border-bottom: 1px solid rgba(0,0,0,0.1); margin: 1rem 0 2rem 0; padding-bottom: 1rem; color: #0277bd; font-weight: 650; letter-spacing: -3px;">ADD NEW USER</h4>
                 <div class="col s6">
                     <img class="imgClsModal" alt="Not found" src="./img/newUser.png">
                 </div>
                 <div class="col s6">
                     <div class="form-group col s12">
                         <label for="name">Full name</label>
                         <input id="name" type="text" class="form-control validate">
                     </div>
                     <div class="form-group col s12">
                         <label for="email">Email</label>
                         <input id="email" type="email" class="form-control validate">
                     </div>
                     <div class="form-group col s12">
                         <label for="phone">Phone</label>
                         <input id="phone" type="text" class="form-control validate">
                     </div>
                     <div class="form-group col s12">
                         <label for="city">City</label>
                         <input id="city" type="text" class="form-control validate">
                     </div>
                     <div class="form-group col s12" style="margin-top: 0.6rem;">
                         <input type="submit" value="SUBMIT" class="form-control userSubmit" style="display: block; width: 100%; background-color:  #0277bd; cursor: pointer; color: white; padding: 0.4rem; border-radius: 5px;">
                     </div>
                 </div>
                 
            
              </div>
            `;
        }
        return output;
    }

    showMessageHelper(msg, className, parent, insertBeforeEl){
        //Make sure that only one error messageDiv is displayed at the time 
        parent.childNodes.forEach(function (x) {
            if (x.id === "messageDiv") {
                x.style.display = "none";
            }
        });

        // Create div
        const div = document.createElement('div');
        //Add id
        div.id = "messageDiv"
        //Add class to div
        div.className += className;
        // Add text
        div.appendChild(document.createTextNode(msg));

        //Set the styling
        div.style.color = "white";
        div.style.padding = "1rem";
        div.style.borderRadius = "10px";
        if (className == "success") {
            div.style.backgroundColor = "green";
        } else {
            div.style.backgroundColor = "red";
        }

        // Insert div
        parent.insertBefore(div, insertBeforeEl);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('#messageDiv').remove();
        }, 3000);
    }

    showMessage(msg, className, inModal = false, mobile = false) {
        //If in modal === true means we're showing the msg inside the modal div
        if (inModal && !mobile) {
            // Get parent
            const parent = document.querySelector('.formDiv');
            //Get el to insert before
            const insertBeforeEl = document.querySelector('.formDiv h4');
            this.showMessageHelper(msg, className, parent, insertBeforeEl);

        } else if (!inModal && !mobile){
            //Else if we're displaying it on the main page or to be precise in usersSection div
            const parent = document.querySelector("#usersSection");
            const insertBeforeEl = document.querySelector("#usersSection h3");
            this.showMessageHelper(msg, className, parent, insertBeforeEl);
        } 
        else if (inModal && mobile) {
            //Else we're displaying it inside modal div in mobile version
            const parent = document.querySelector("#modal3 .modal-footer");
            const insertBeforeEl = document.querySelector(".modal-footer.a");
            this.showMessageHelper(msg, className, parent, insertBeforeEl);
        }

    }

    //Close modal and reset the valus
    closeModal() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("city").value = "";

        $('.modal').modal('close', "#modal3");
    }
}