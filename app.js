const fs = require('fs');
const notes = require('./notes.js'); //   ./ tells us that we are in root directory
const _ = require('lodash');  //third party module
const yargs = require('yargs'); //yargs is used for parsing command line data

const titleOptions = {
  describe: 'Title of the note',
  demand: true, //same as required//
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
};

var command = process.argv[2];   //yargs.argv beutifies the command line code given

var argv = yargs
.command('list','Lists all notes')
.command('add','Add a new note',{
  title:titleOptions ,
  body:bodyOptions
})
.command('read','Reads a note',{
  title : titleOptions
})
.command('remove','Removes a note',{
  title : titleOptions 
})
.help()
.argv;  //getting simplified command line argument//

// console.log('Yargs:',argv);

if(command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);  //for Printing invidual note
  });
}
else if(command === 'add')
{
  var note = notes.addNote(argv.title, argv.body);
  if(note === undefined){
    console.log('Note title is already in use');
  }
  else {
    console.log('Note created');
    notes.logNote(note);
  }
}
else if(command === 'read')
{
  var note = notes.getNote(argv.title);
  if(note === undefined){
    console.log('Note not found');
  }
  else {
    console.log('Note read');
    notes.logNote(note);
  }
}
else if(command === 'remove')
{
  var note = notes.removeNote(argv.title);
  var message = note ? 'Note was removed' : 'Note was not found';
  console.log(message);
}
else
{
  console.log('Command not recognized');
}












// console.log('Result :',notes.addFunc(9,-2));
// fs.appendFileSync('Greetings.txt',`Hello ${user.username}!`);
