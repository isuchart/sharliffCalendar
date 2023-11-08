

document.addEventListener('DOMContentLoaded', function() {
  liff.init({ liffId: 'xxxxxxxxxxxxxxxxxx' })
    .then(() => {
      if (liff.isLoggedIn()) {
        // เมื่อผู้ใช้ล็อกอินแล้ว


        liff.getProfile()
          .then((profile) => {
            const profileImage = document.getElementById('profileImage');
            const displayName = document.getElementById('displayName');

            profileImage.src = profile.pictureUrl;
            displayName.textContent = profile.displayName;
            //end lift step profile
            showList("all")


            //end todolist step 1


          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        // ถ้าผู้ใช้ยังไม่ได้ล็อกอิน ให้ให้โปรแกรมดำเนินการตามที่คุณต้องการ
        console.log('User is not logged in');
        liff.login();
      }
    })
    .catch((err) => {
      console.error(err);
    });
});


const taskInput = document.querySelector("#taskinput")
let list_todos = JSON.parse(localStorage.getItem("my-todo"));
let filterSearch = document.querySelectorAll(".nav a")
let clearAll = document.getElementById("clearall")

let listgroupBox = document.querySelector("#listgroupBox")
let editId;
let isEditTask = false




filterSearch.forEach((a_link) => {
  a_link.addEventListener("click", () => {
    console.log(a_link.id)
    document.querySelector("a.active").classList.remove("active")
    a_link.classList.add("active")
    showList(a_link.id)
  })
})



function showList(listOffilter) {
  let li = "";
  if (list_todos) {
    list_todos.forEach((list, id) => {
      let isCompleted = list.status == "completed" ? "checked" : "";
      if (listOffilter == list.status || listOffilter == "all") {
        li += `<li class="list-group-item d-flex justify-content-between py-1">
                  <div class="boxinput">
                      <input onclick="updateStatus(this)" class="form-check-input me-1" type="checkbox" id="${id}" ${isCompleted}>
                      <label class="form-chek-label ${isCompleted}" for="${id}">${list.name}</label>
                  </div>
                  <div class="boxbtn">
                      <div class="btn-group">
                          <span data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></span>
                          <ul class="dropdown-menu dropdown-menu-end">
                              <li onclick="editTask(${id} , '${list.name}')" class="dropdown-item text-warning"><i class="me-3 bi bi-pencil-fill"></i>edit</li>
                              <li onclick="removeTask(${id})" class="dropdown-item text-danger"><i class="me-3 bi bi-trash-fill"></i>remove</li>
                          </ul>
                        </div>
                  </div>
              </li>`;
      }

    });
  }
  listgroupBox.innerHTML = li || `<span>list not foud here</span>`;


}

function removeTask(idlist) {
  list_todos.splice(idlist, 1);
  localStorage.setItem("my-todo", JSON.stringify(list_todos));
  showList("all");
}

clearAll.addEventListener("click", () => {
  list_todos.splice(0, list_todos.length);
  localStorage.setItem("my-todo", JSON.stringify(list_todos));
  showList("all");

})

function editTask(idlist, taskName) {
  editId = idlist;
  isEditTask = true;
  taskInput.value = taskName;
  // localStorage.setItem("my-todo", JSON.stringify(list_todos));
  // showList();
}



function updateStatus(sel) {
  let taskName = sel.parentElement.lastElementChild;
  console.log(taskName)
  if (sel.checked) {
    taskName.classList.add("checked");
    list_todos[sel.id].status = "completed"
  } else {
    taskName.classList.remove("checked")
    list_todos[sel.id].status = "pending"
  }
  localStorage.setItem("my-todo", JSON.stringify(list_todos));
}


taskInput.addEventListener("keyup", e => {
  let userList = taskInput.value.trim();
  if (e.key == "Enter" && userList) {
    if (!isEditTask) {
      if (!list_todos) {
        list_todos = [];
      }
      let infoTodo = { name: userList, status: "pending" }
      list_todos.push(infoTodo)
    } else {
      isEditTask = false;
      list_todos[editId].name = userList;
    }

    taskInput.value = ""
    localStorage.setItem("my-todo", JSON.stringify(list_todos));
    showList("all");

  }
});



function shareflex(flex) {

  liff.shareTargetPicker(flex, {
    isMultiple: true,
  }).then(function() {
    liff.closeWindow();
  });
}


var senMes = document.getElementById("senM")
senMes.addEventListener("click", showflex)


function showflex() {
  console.log("dddd ", list_todos)

  var fl = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "size": "giga",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "My To Do List",
              "weight": "bold",
              "size": "xxl",
              "color": "#FFFFFF"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Pending",
                  "color": "#FFFFFF"
                },
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "color": "#FFFFFF",
                  "text": "completed"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    // {
                    //   "type": "icon",
                    //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                    // },
                    // {
                    //   "type": "text",
                    //   "text": "hello, world",
                    //   "color": "#FFFFFF",
                    //   "offsetStart": "15px"
                    // }
                  ],
                  "paddingStart": "20px"
                }
              ]
            }
          ],
          "background": {
            "type": "linearGradient",
            "angle": "35deg",
            "startColor": "#1f0024",
            "endColor": "#610979",
            "centerColor": "#ff00bd"
          }
        }
      }

    }

  ]

  list_todos.forEach((f)=>{
    let xxx = {
      "type": "box",
      "layout": "baseline",
      "contents": [
        {
          "type": "icon",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
        },
        {
          "type": "text",
          "text": ""+f.name,
          "color": "#FFFFFF",
          "offsetStart": "15px"
        }
      ],
      "paddingStart": "20px"
    }

    if (f.status === "pending"){
      fl[0].contents.body.contents[1].contents.push(xxx)
    }else{
      fl[0].contents.body.contents[2].contents.push(xxx)
    }
  })

  
  // let xxx = {
  //   "type": "box",
  //   "layout": "baseline",
  //   "contents": [
  //     {
  //       "type": "icon",
  //       "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
  //     },
  //     {
  //       "type": "text",
  //       "text": "hello, world",
  //       "color": "#FFFFFF",
  //       "offsetStart": "15px"
  //     }
  //   ],
  //   "paddingStart": "20px"
  // }
  
  // fl[0].contents.body.contents[1].contents.push(xxx);

  shareflex(fl)
}

