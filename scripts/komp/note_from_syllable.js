/*

Autogenerating Music Exercises for education program "Muusika Kompositsiooniõpetus" https://et.wikibooks.org/wiki/Muusika_kompositsiooni%C3%B5petus/N%C3%84IDISKURSUS._G%C3%9CMNAASIUM
Commissioned by Estonian Ministry of Education and Research, Tallinn University,  in the frame of Digital Learning Resources project DigiÕppeVaramu https://htk.tlu.ee/oppevara/


Copyright 2018, by Tarmo Johannes trmjhnns@gmail.com

License: MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

// Original exercise: 1.3.8. harjutus. Helikõrgus. Viiulivõti. Antud on helikõrgus silpnimetusega. Kirjuta helikõrgus tähtnimetusega, noodijoonestikul, klaviatuuril.



function noteFromSyllable(clef, containerNode, canvasClassName) { 
	
	var answered = false;
	var noteIndex = -1, currentNoteIndex = -1;
	this.containerNode = containerNode===undefined ? document.body : containerNode;
	this.canvasClassName = canvasClassName === undefined ? "mainCanvas" : canvasClassName;	
	var notes = new NoteClass();
	
	// set necessary methods in exercise
	var exercise = new MusicExercise(this.containerNode, this.canvasClassName, 150,10,10,1.5); // bigger scale for note input
 	exercise.time = "";
 	exercise.key = "";
	exercise.timeToThink = 30; // more time for doing the test
	
	
	// set clef
	var possibleNotes;
	if (clef==="bass") {
		exercise.clef ="bass"
		possibleNotes = notes.bassClefNotes;
	} else {
		exercise.clef = "treble"
		possibleNotes = notes.violinClefNotes;
	}
	
	// Create or set necessary HTML elements
	this.containerNode.getElementsByClassName("exerciseTitle")[0].innerHTML = "Kirjuta helikõrgus silpnime järgi. " + ( (clef==="bass") ? "Bassivõti." : " Viiulivõti." );
	this.containerNode.getElementsByClassName("description")[0].innerHTML = "Antud on helikõrgus silpnimetusega. Kirjuta helikõrgus tähtnimetusega, noodijoonestikul, klaviatuuril.<br>Alteratsioonimärkide lisamiseks vajuta + või - nupule või kasuta vatavaid klahve arvutklaviatuuril."; 

	
	function handleAccidental(plusMinus) {  // -1 to lower half tone, +1 to raise halftone (or to next enharmonic note)
		console.log("handleAccidental", plusMinus );
		if (currentNoteIndex > 0) {
			currentNoteIndex += plusMinus;
			if (currentNoteIndex>=possibleNotes.length-1)
				currentNoteIndex = possibleNotes.length-1;
			if (currentNoteIndex<0)
				currentNoteIndex = 0;
			console.log(currentNoteIndex, possibleNotes[currentNoteIndex].vtNote)
			exercise.notes = possibleNotes[currentNoteIndex].vtNote;
			exercise.draw();
		} else {
			alert("Klõpsa esmalt noodi asukohale noodijoonestikul!")
		}
		
	}
	

	document.body.addEventListener('keypress', function (e) { // TODO: how to remove when this function is not used? 
		e = e || window.event;
		var charCode = e.keyCode || e.which;		
		if ( charCode === 45 && currentNoteIndex >= 0) { // minus key
			handleAccidental(-1);
		}
		if (charCode === 43 && currentNoteIndex >= 0 ) { // plus key
			handleAccidental(1);
		}
		
	}, false);
	
	var diesisButton = document.createElement("button");
    diesisButton.innerHTML = "+";
    diesisButton.onclick = function(){handleAccidental(1)};
    diesisButton.style.position = "relative"; // raise it to the height of staff
	diesisButton.style.top = "-150px";
    exercise.canvas.appendChild(diesisButton);
	
	var bemolleButton = document.createElement("button");
    bemolleButton.innerHTML = "-";
    bemolleButton.onclick = function(){handleAccidental(-1)};
    bemolleButton.style.position = "relative";
	bemolleButton.style.top = "-150px";
    exercise.canvas.appendChild(bemolleButton);
	
	var pianoDiv = document.createElement("div"); // piano keyboard
	pianoDiv.style.marginTop = "5px";
	exercise.canvas.appendChild(pianoDiv);

	var piano = new Piano(pianoDiv); // 1 octava from middle C by default
	piano.createPiano();
	
	
	exercise.generate = function() {
				
		var tryThis = Math.floor(Math.random()*possibleNotes.length);
		while (tryThis === noteIndex) { // avoid twice the same
			tryThis = Math.floor(Math.random()*possibleNotes.length);
		}
		noteIndex = tryThis; 
		//console.log("Selected", possibleNotes[noteIndex].name, possibleNotes[noteIndex].syllable);
		
		var octave = parseInt(possibleNotes[noteIndex].vtNote.split("/")[1]);
		var octaveString = "";
		switch (octave) {
			case 0: octaveString = " subkontraoktavis"; break;
			case 1: octaveString = " kontraoktavis"; break;
			case 2: octaveString = " suures oktavis"; break;
			case 3: octaveString = " väikses oktavis"; break;
			case 4: octaveString = " esimeses oktavis"; break;
			case 5: octaveString = " teises oktavis"; break;
			case 6: octaveString = " kolmandas oktavis"; break;
			case 7: octaveString = " neljandas oktavis"; break;
			case 8: octaveString = " viiendas oktavis"; break;
			default: octaveString = " tundmatus oktavis"; break;
		}
		
		var syllable = notes.removeLastDigit(possibleNotes[noteIndex].syllable.toLowerCase());
		
		this.containerNode.getElementsByClassName("question")[0].innerHTML =	'<br>Sisesta noodijoonestikule <b>' + syllable + octaveString + '</b><br>Noot <b>' + notes.removeLastDigit(possibleNotes[noteIndex].syllable.toLowerCase())  + '</b> on tähtnimetusega: <select class="noteName"><option>---</option></select><br>Kui oled noodi sisetanud noodijoonestikule, vajuta Vasta:' ;
		
		var select = this.containerNode.getElementsByClassName('noteName')[0];
		for(var i = 0; i < 7*3; i++) {
			var option = document.createElement('option');
			var noteName = notes.removeLastDigit(possibleNotes[i].name.toLowerCase()); // remove octave (1 or 2), if present
			option.innerHTML = noteName;
			option.value = noteName;
			select.appendChild(option);
		}
		
		exercise.notes = ""; // nothing drawn	
		currentNoteIndex = -1; 	
		answered = false; 
	}
	
	
	
	exercise.clickActions = function(x,y) {
		// console.log(x,y);		

		var line = exercise.artist.staves[0].note.getLineForY(y);
		
		// find note by line
		line =  Math.round(line*2)/2; // round to neares 0.5
		for (var i= 0; i<possibleNotes.length;i++) {
			if (possibleNotes[i].hasOwnProperty("line") ) {
				//console.log(i, possibleNotes[i].line, line)
				if (possibleNotes[i].line === line) {
					// console.log("FOUND ", i, possibleNotes[i].vtNote);
					exercise.notes =  possibleNotes[i].vtNote;
					currentNoteIndex = i;
					exercise.draw();
					break;
				}
			}
		}
	}
	
	exercise.renew = function() {
		this.containerNode.getElementsByClassName("feedback")[0].innerHTML = "";
		piano.deactivateAllKeys();
        exercise.generate();
        exercise.draw();
	}
	
	exercise.renew();		
	
	exercise.responseFunction = function() {
		if (currentNoteIndex < 0) {
			alert("Sisesta noot noodijoonestikule!")
			return;
		}
		
		if (!piano.pressedKey.active) {
			alert("Klahv klaviatuuril valimata!")
			return;
		}
		
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		
		exercise.attempts += 1;
		var feedback = "";
		var correct = false;
		
		// TODO: eemalda silbilt oktavinumber
		
		var noteName = notes.removeLastDigit(possibleNotes[noteIndex].name.toLowerCase());
		
		if (this.containerNode.getElementsByClassName("noteName")[0].value === noteName ) { 
			feedback += "Tähtnimetus <b>õige!</b> "
			correct = true;
		} else {
			feedback += "Tähtnimetus <b>vale!</b> See on hoopis " + noteName + ". ";			
			correct = false;
		}
		
		if (currentNoteIndex === noteIndex) {
			feedback += "Noot noodijoonestikul on <b>õige!</b> "
			correct = correct && true;
		} else {
			feedback += "Noot noodijoonestikul on <b>vale!</b> "; 
			exercise.notes += " " + possibleNotes[noteIndex].vtNote;
			exercise.draw(); // redraw with right note
			correct = correct && false;
		}
		
		//console.log(piano.pressedKey.dataset.midinote, possibleNotes[noteIndex].midiNote)
		
		if ( piano.pressedKey.dataset.midinote%12 === possibleNotes[noteIndex].midiNote%12) { // check pich class, igonre octave
			feedback += "Noot klaviatuuril on <b>õige!</b> "
			piano.fillKey(piano.pressedKey, "green");
			correct = correct && true;
		} else {
			feedback += "Noot klaviatuuril <b>vale!</b> "; 
			piano.fillKey(piano.pressedKey, "red");
			piano.fillKey(piano.findKeyByMidiNote(possibleNotes[noteIndex].midiNote%12), "blue")
			correct = correct && false;
		}
		
		if (correct) {
			exercise.score += 1;
		}
		
		this.containerNode.getElementsByClassName("attempts")[0].innerHTML = exercise.attempts;
		this.containerNode.getElementsByClassName("score")[0].innerHTML = exercise.score;
		this.containerNode.getElementsByClassName("feedback")[0].innerHTML = feedback; 		
		answered = true;
		
		if (exercise.testIsRunning) { // add info to test report
			exercise.testReport +=  exercise.currentQuestion.toString() +  '. Küsitud noot: ' + possibleNotes[noteIndex].syllable   
			+ '. Sisestatud: ' + this.containerNode.getElementsByClassName("noteName")[0].value;
			exercise.testReport += ".<br>Tagasiside: " + feedback + "<br>";	
		}
		
	}
	return exercise;

}
