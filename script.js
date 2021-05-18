let allfilter = document.querySelectorAll(".filter-boxes");
let main = document.querySelector(".main");
delete_box = document.querySelector(".delete-box");
let alltaskdone = localStorage.getItem("allTasks");
let data = JSON.parse(alltaskdone);
if (alltaskdone != null) {
    let data = JSON.parse(alltaskdone);
    for (let i = 0; i < data.length; i++) {
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");
        ticket.innerHTML = `<div class="ticket-color ticket-color-${data[i].selectPriority}"></div>
        <div class="ticket-id">${data[i].taskid}</div>
        <div class="ticket-task">${data[i].task}</div>`;
        // let alltickets = document.querySelectorAll(".ticket");
            ticket.addEventListener("click", function (e) {
                if (e.currentTarget.classList.contains("default")) {
                    e.currentTarget.classList.remove("default");
                }
                else {
                    e.currentTarget.classList.add("default");
                }
            });
            main.appendChild(ticket);
    }
}


let modal_visibility = false;
let selectPriority = "pink";
for (let i = 0; i < allfilter.length; i++) {
    allfilter[i].addEventListener("click", filterhandler);
}
function filterhandler(e) {
    let filterColor = window.getComputedStyle(e.currentTarget, null).getPropertyValue('background-color');
    main.style.backgroundColor = filterColor;
}
let add_box = document.querySelector(".add-box");
add_box.addEventListener("click", showModal);
let modal_div = document.querySelector(".type-modal-div");

function showModal() {
    if (modal_visibility != true) {
        let modal = `<div class="modal-box">
        <div class="type-modal-div" contenteditable="true" data-type="false">
                <span class="placeholder-modal-div"> Enter Your Text</span>
        </div>
        <div class="priority-boxes">
            <div class="pink-modal-box modal-inner-box active"></div>
            <div class="blue-modal-box modal-inner-box"></div>
            <div class="red-modal-box modal-inner-box"></div>
            <div class="violet-modal-box modal-inner-box"></div>
        </div>
    </div>`
        main.innerHTML = main.innerHTML + modal;
        selectPriority = "pink";
        let modal_div = document.querySelector(".type-modal-div");
        modal_div.addEventListener("click", function (e) {
            if (e.currentTarget.getAttribute("data-type") == "false")
                e.currentTarget.innerHTML = "";
            e.currentTarget.setAttribute("data-type", "true");
        })
        modal_visibility = true;
        modal_div.addEventListener("keypress", addticket.bind(this, modal_div));
    }
    let priority_list = document.querySelectorAll(".modal-inner-box");
    for (let i = 0; i < priority_list.length; i++) {
        priority_list[i].addEventListener("click", priority_function);
    }

}
function priority_function(e) {
    let activeClass = document.querySelector(".modal-box .active");
    activeClass.classList.remove("active");
    selectPriority = e.currentTarget.classList[0].split("-")[0];
    e.currentTarget.classList.add("active");
}
//
function addticket(modal_div, e) {
    if (e.key == "Enter" && modal_div.innerText != "" && e.shiftKey == false) {
        let ticket = document.createElement("div");
        let id = uid();
        let task = modal_div.innerText;
        ticket.classList.add("ticket")
        ticket.innerHTML = `<div class="ticket-color ticket-color-${selectPriority}"></div>
        <div class="ticket-id">${id}</div>
        <div class="ticket-task">${task}</div>`;
        document.querySelector(".modal-box").remove();
        modal_visibility = false;
        main.appendChild(ticket);


        alltaskdone = localStorage.getItem("allTasks");
        if (alltaskdone == null) {
            let data = [{ "taskid": id, "task": task, "selectPriority": selectPriority }];
            localStorage.setItem("allTasks", JSON.stringify(data));
        }
        else {
            let data = JSON.parse(alltaskdone);
            data.push({"taskid": id, "task": task, "selectPriority": selectPriority});
            localStorage.setItem("allTasks", JSON.stringify(data));
        }
            let alltickets=document.querySelectorAll(".ticket");
            for(let i=0;i<alltickets.length;i++)
            {
                alltickets[i].addEventListener("click",function(e){
                    if (e.currentTarget.classList.contains("default")) {
                        e.currentTarget.classList.remove("default");
                    }
                    else {
                        e.currentTarget.classList.add("default");
                    }
                })
            }

    }
    else if (e.key == "Enter" && e.shiftKey == false) {
        e.preventDefault();
        alert("Not Typed Anything");
    }
}
delete_box.addEventListener("click", function(e) {
    let ticketCounters = document.querySelectorAll(".ticket.default");
    let allTasks=JSON.parse(localStorage.getItem("allTasks"));
    for (let i = 0; i < ticketCounters.length; i++) {
        ticketCounters[i].remove();
        allTasks = allTasks.filter(function(data){
            return data.taskid !=ticketCounters[i].querySelector(".ticket-id").innerText;
                
        })
    }
    localStorage.setItem("allTasks",JSON.stringify(allTasks));
});


