const fs = require('fs');

var fetchNotes = () => {
  try{
    var getNotes = fs.readFileSync('note-data.json');  //reading from file
    return JSON.parse(getNotes);  //returning the object
  }catch(e){
    return [];  //if fail return NULL
  }
};

var saveNote = (note) =>{
  fs.writeFileSync('note-data.json',JSON.stringify(note));  //save the note object in the file
};

var getAll = () => {
  return fetchNotes();
};

var addNote = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);  //checking for duplicacy if title matches and returns an array

  if(duplicateNotes.length === 0){                              //if no duplicacy
    notes.push(note);
    saveNote(notes);
    return note;
  }
};

var getNote = (title) => {
   var notes = fetchNotes();
   var readNote = notes.filter((note) => note.title === title);
   return readNote[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => note.title !== title);  //considers all those notes whicb are not equal to the argument Title
  saveNote(newNotes);
  return (notes.length !== newNotes.length);  //true means that note removed
};

var logNote = (note) => {
  //debugger; //creates a break point for debugging
  console.log('-----');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  getAll,
  addNote, // same as addNotes : addNotes as name and values are same //
  getNote,
  removeNote,
  logNote
};

// console.log(module);
