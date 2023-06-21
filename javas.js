//<<----------these are global variables---------------->>
let bookname = document.getElementById("book-name");
let authorname = document.getElementById("author-name");
let isbn = document.getElementById("isbn");
let button = document.getElementById("buttontoclick");
var listofbooks = document.getElementById("listofbooks");
//<<--------------------------------------->>

showingbooksdata(); //function calling to show data on HtML page inaccordance of local storage data

//---->>here values of blanks are sending into an object and sending object to another function
button.addEventListener("click", function (e) {
  e.preventDefault();

  if (bookname.value == "" || authorname.value == "" || isbn.value == "") {
    alert("please fill all the blanks and ISBN should be unique");
  } else {
    let books = {
      booktitle: bookname.value,
      authortitle: authorname.value,
      isbncode: isbn.value,
    };
    console.log(books);
    addingbooksintothelist(books);
    addiingbooktolocalstorage(books);
    clearvaluefileds();
  }
});

//<<---------------these functions belong to front end and display part of the project---------->>
//---->>displaying books into the bottom of the page as taking object as input in the form of parameter
function addingbooksintothelist(showingbook) {
  var rowsforbooks = document.createElement("tr");

  //we use $dollar and ``backtick sign to have direct values of the concerned variable
  rowsforbooks.innerHTML = `<td>${showingbook.booktitle}</td>
    <td>${showingbook.authortitle}</td>
    <td>${showingbook.isbncode}</td> 
    <td><i class="delete dustbin fa-solid fa-trash"></i></td>`;

  listofbooks.appendChild(rowsforbooks);
}

//--->>used to have black empty to fill values again
function clearvaluefileds() {
  bookname.value = "";
  authorname.value = "";
  isbn.value = "";
}

//----->>it is useful in deleting the displayed book into the list by clicking on the dustbin
function removingtablerow(vanish) {
  if (vanish.classList.contains("delete")) {
    vanish.parentElement.parentElement.remove();
  }
}
//<<---------------------------------------------------------->>>

//<<---------these are function are dealing with the local storage part of the program which in backend or notdisplay part of the project--------------->>
//----->>here storing object(keys and pairs) into an array in the local storage
//----->>local storage is space available in the browser to store data there
//----->>storing data always should be in the form of string
function addiingbooktolocalstorage(storingbooks) {
  let arr = booksavaliabilitylocal();
  arr.push(storingbooks);
  localStorage.setItem("librarybooks", JSON.stringify(arr));
}

//----->>here we are retrieve data from the local stroage to add and delete data further
function booksavaliabilitylocal() {
  let loglist;
  if (localStorage.getItem("librarybooks") == null) {
    loglist = [];
  } else {
    loglist = JSON.parse(localStorage.getItem("librarybooks"));
  }
  console.log(loglist);
  return loglist;
}

//--->>this function is responsible in deleting data from local storage
function removingdatafromlocalstorage(removinghelper) {
  let holdingarray = booksavaliabilitylocal();
  holdingarray.forEach((removingbook, index) => {
    if (removingbook.isbncode == removinghelper) {
      holdingarray.splice(index, 1);
    }
  });
  localStorage.setItem("librarybooks", JSON.stringify(holdingarray));
}
//<<------------------------------------------------------>>

//---->>this function is responsible in sending that value through which we remove books and entered data
listofbooks.addEventListener("click", function (press) {
  removingtablerow(press.target);
  removingdatafromlocalstorage(
    press.target.parentElement.previousElementSibling.textContent
  );
});

//<<-------this is the most improtant function - showing data as in cordinance with the local storage
function showingbooksdata() {
  let displaybooks = booksavaliabilitylocal();
  displaybooks.forEach((onebyone) => addingbooksintothelist(onebyone));
}
