allNotes = new Array("A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#");
noteBuffer = new Array();

// Request MIDI access
if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

} else {
  console.log('WebMIDI is not supported in this browser.');
}

// Function to run when requestMIDIAccess is successful
function onMIDISuccess(midiAccess) {
   var inputs = midiAccess.inputs;
   var outputs = midiAccess.outputs;
   //console.log("midi connected");
   // Attach MIDI event "listeners" to each input
   for (var input of midiAccess.inputs.values()) {
       input.onmidimessage = getMIDIMessage;
   }
}

// Function to run when requestMIDIAccess fails
function onMIDIFailure() {
   console.log('Error: Could not access MIDI devices.');
}

// Function to parse the MIDI messages we receive
// For this app, we're only concerned with the actual note value,
// but we can parse for other information, as well
function getMIDIMessage(message) {
   var command = message.data[0];
   var note = message.data[1];
   var velocity = (message.data.length > 2) ? message.data[2] : 0;

   switch (command) {
      case 176:
        // cc?
        console.log(note + " - " + velocity);
        break;
       case 144: // note on
           if (velocity > 0) {
               //console.log(new Date().getMilliseconds() + " " + command + ":" + note + ":" + velocity);
               noteOn(note);
           } else {
               noteOff(note);
           }
           break;
       case 128: // note off
           noteOff(note);
           break;
       // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
   }
}

// Function to handle noteOn messages (ie. key is pressed)
// Think of this like an 'onkeydown' event
function noteOn(note) {
   let label = createAnimationEvent(note, "tree", midiToNote(note)); // Spawn a new tree

   noteBuffer[note] = label;
   //console.log(note);
}
//TODO: connect logic here

// Function to handle noteOff messages (ie. key is released)
// Think of this like an 'onkeyup' event
function noteOff(note) {
  if(note in noteBuffer) {
    let label = noteBuffer[note];
    stopAnimationEvent(label);

    delete noteBuffer[note];
  }
}

function midiToNote(mNote) {
  return allNotes[(mNote - 21) % 12];
}
