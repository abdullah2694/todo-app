var firebaseConfig = {
    apiKey: "AIzaSyAUx5HPPQWwpkunV24aCG4cnZiLLyocRvQ",
    authDomain: "todo-db-24a1f.firebaseapp.com",
    databaseURL: "https://todo-db-24a1f-default-rtdb.firebaseio.com",
    projectId: "todo-db-24a1f",
    storageBucket: "todo-db-24a1f.firebasestorage.app",
    messagingSenderId: "746101602370",
    appId: "1:746101602370:web:3ef2684527564bff9295db",
    measurementId: "G-91HJE70G3K"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
// Firebase real-time listener for new todos
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");

    var ulElement = document.getElementById("list"); // updated to match your HTML id

    // Create text node for todo item
    var liText = document.createTextNode(data.val().todo_value);
    liElement.appendChild(liText);

    // Create DELETE button
    var delBtn = document.createElement("button");
    delBtn.innerText = "DELETE";
    delBtn.setAttribute("onclick", "deleteSingleTodo(this)");
    delBtn.setAttribute("id", data.val().id);
    delBtn.setAttribute("class", "btn btn-danger btn-sm ms-2");

    // Create EDIT button
    var editBtn = document.createElement("button");
    editBtn.innerText = "EDIT";
    editBtn.setAttribute("onclick", "editSingleTodo(this)");
    editBtn.setAttribute("id", data.val().id);
    editBtn.setAttribute("class", "btn btn-warning btn-sm ms-2");

    // Append buttons to list item
    liElement.appendChild(delBtn);
    liElement.appendChild(editBtn);

    // Append list item to UL
    ulElement.appendChild(liElement);
  });

// Function to add a new todo
function addTodo() {
  try {
    var todoInput = document.getElementById("inputField");

    if (todoInput.value.trim() === "") {
      alert("Please enter a todo item.");
      return;
    }

    var id = firebase.database().ref("todos").push().key;

    var obj = {
      todo_value: todoInput.value,
      id: id,
    };

    firebase.database().ref(`todos/${id}`).set(obj);
    todoInput.value = "";
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

// Function to delete all todos
function deleteAllTodos() {
  var ulElement = document.getElementById("list");
  ulElement.innerHTML = "";
  firebase.database().ref("todos").remove();
}

// Function to delete a single todo
function deleteSingleTodo(e) {
  e.parentNode.remove();
  firebase.database().ref(`todos/${e.id}`).remove();
}

// Function to edit a single todo
function editSingleTodo(e) {
  var updatedValue = prompt("Enter updated todo:");

  if (updatedValue && updatedValue.trim() !== "") {
    e.parentNode.firstChild.nodeValue = updatedValue;

    var updatedObj = {
      todo_value: updatedValue,
      id: e.id,
    };

    firebase.database().ref(`todos/${e.id}`).set(updatedObj);
  }
}
