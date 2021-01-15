console.log("Welcome to notes script.jss");
showNotes();


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
   
    if (notes == null) {

        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj={
        note:addTxt.value,
        title:addTitle.value,
        b:true
    
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

   
    showNotes();

});

//function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {

        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
  

    let html = "";
    notesObj.forEach(function (element, index) {
        let mark=element.title
       
       
        html +=
            ` <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body" >
        <i class="fa fa-bookmark-o ${element.b}"  aria-hidden="true" id="${mark}"  onclick="bookmarkNote(this.id,${index})" ></i>
            <h5 class="card-title">${element.title} </h5>
            <p class="card-text" id=${index}>${element.note}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
            <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Notes</button>

        </div>
    </div>`
   

    });
    
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }
}
//function to bookmark note
function bookmarkNote(mark,index){
    //  console.log(mark);
    //  console.log(index)
     let notes = localStorage.getItem("notes");
      notesObj = JSON.parse(notes);
      let sticker= notesObj[index].b 
      localStorage.setItem("notes", JSON.stringify(notesObj));
   let bookmark=document.getElementById(mark);
     
   if(sticker==true)
  { bookmark.setAttribute('style',' color:black; background-color:yellow;');
 
  let notes = localStorage.getItem("notes");

            notesObj = JSON.parse(notes);
            notesObj[index].b=false;
            localStorage.setItem("notes", JSON.stringify(notesObj));
  
}
   else if(sticker==false)
   {bookmark.setAttribute('style',' color:black; background-color:white;');
 
   let notes = localStorage.getItem("notes");

   notesObj = JSON.parse(notes);
   notesObj[index].b =true;
   localStorage.setItem("notes", JSON.stringify(notesObj));
}
    // console.log(bookmark)
     
}
//function to edit notes
function editNote(index) {
      console.log(index)
    let edit = document.getElementById(index);
    let no = document.getElementsByClassName('textarea').length;
    if (no == 0) {
        let html = edit.innerHTML
        edit.innerHTML = `<textarea class="form-control" class"textarea" id="textarea" rows="3">${html}</textarea>`
        let textarea = document.getElementById('textarea');
        textarea.addEventListener('blur', function () {
            edit.innerHTML = textarea.value;
            let notes = localStorage.getItem("notes");

            notesObj = JSON.parse(notes);
            notesObj[index].note = textarea.value;
            localStorage.setItem("notes", JSON.stringify(notesObj));
        })
    }



}
//function to delete note
function deleteNote(index) {
    console.log('I am deleting this note', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {

        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
    showNotes();

}
search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    //console.log("input Event Fired",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })

})


