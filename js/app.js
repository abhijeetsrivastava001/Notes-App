console.log("Welcome to app.js");

//If we have saved notes then it will be shown first
showNotes();

//On clicking Add note Button
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    
    //putting all the previous notes in an array
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    //new note which we added just now by clicking Add note button
    myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    //Pushing the new note in the array
    notesObj.push(myObj);

    //Storing the array in localStorage
    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTitle.value = "";
    addTxt.value = "";

    showNotes();
})

function removeNotes(){
    let noteElem = document.getElementById('notes');
    noteElem.innerHTML = '';
}

//This function called for getting all the notes to our interface
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    let i;
    notesObj.forEach(function (element, index) {
        const myText = element.text.slice(0, 20);
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${myText}...</p>    
                        <button id = ${index} onclick = "detailNote(this.id)" class="btn btn-info">Details</button>
                        <button id = ${index} onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });

    let noteElem = document.getElementById('notes');
    
    if (notesObj.length != 0) {
        noteElem.innerHTML = html;
    }
    else {
        noteElem.innerHTML = `No Pending Notes!!
        <br>
        Add a note using "Add Note" above.`;
    }

}

function detailNote(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    removeNotes();
    let noteElem = document.getElementById('notes');
    noteElem.innerHTML = `<div class="noteCard my-2 mx-2 card" style="width: 80vw">
    <div class="card-body">
        <h5 class="card-title">${notesObj[index].title}</h5>
        <p class="card-text">${notesObj[index].text}...</p>    
        <button onclick = "showNotes()" class="btn btn-secondary">Dismis</button>
    </div>
    </div>`;

}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    
    showNotes();
}

//Putting the search functionality to our app
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let titleTxt = element.getElementsByTagName('h5')[0].innerText;
        if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})