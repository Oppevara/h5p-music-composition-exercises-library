// Music exercises for "MUUSIKA KOMPOSITSIOONIÕPETUS"
// TODO: proper credits, copyright


// Original exercise:   1.2.4. Helivältus. Lisa taktijooned. Antud on taktimõõt ja rida helivältusi. Kirjuta taktijooned vastavalt taktimõõdule õigesse kohta.


function drawBarlines(containerNode, canvasClassName) { // generates 2 bars in given time, hides barlines, on click draws a line an checks if it is correct (between right notes)
	// variables
	var answered = false;
	var time = "3/4"; 
	var bar1 = {}, bar2 = {};
	
	this.containerNode = containerNode===undefined ? document.body : containerNode;
	this.canvasClassName = canvasClassName === undefined ? "mainCanvas" : canvasClassName;

	
	// Create or set necessary HTML elements
	this.containerNode.getElementsByClassName("exerciseTitle")[0].innerHTML = "Lisa taktijoon";
	this.containerNode.getElementsByClassName("description")[0].innerHTML = "Antud taktimõõt, taktijoon on peidetud. Kus see peaks asuma?"; 
	//TODO: luba ka pause, mitte ainult noodid -  kas vaja?
	this.containerNode.getElementsByClassName("question")[0].innerHTML =	"Kliki noodijoonestukul kohale, kus peaks asuma taktijoon.";
	
	// set necessary methods in exercise
	var exercise = new MusicExercise(this.containerNode,this.canvasClassName);
	exercise.timeToThink = 20
	
	function generateBar(numerator, denomenator) { // return vextab string
		
		var totalDuration = 0; 
		var barLength = numerator/denomenator * 4; // barLength in beats, 6/8 -> 3 beats
		var durations;
		
		do {  // create a rhythm that equals to barLength
			totalDuration = 0;
			durations = [];
			var allowedDurations = [2, 1, 0.5, 0.25];  // TODO: if 3/8, avoid 2-beats etc
			while (totalDuration<=barLength) {                                
				var duration = allowedDurations[Math.floor(Math.random()*allowedDurations.length)];
				
				if ((totalDuration + duration)>barLength) {
					break;
				}
				durations.push(duration);
				totalDuration += duration;
			}
		} while (totalDuration!=barLength);  // bad code, avoid loop, rather add up random notes and fill the rest with suitable values
		//console.log("Generted durations:", durations); 
		
		
		// create VexFlow string of notes
		var parseString = "";
		var possibleNotes = ["C","D","E","F","G"]; // some random pitches
		for (var i=0; i<durations.length; i++) {
			var flexDuration = (4/durations[i]).toString();
			parseString += " :"+flexDuration + " " + possibleNotes[Math.floor(Math.random()*possibleNotes.length)] +"/4 ";
			
		}
		//console.log("Generated notes: ", parseString);
		return {vtNotes: parseString, count: durations.length}; 
		
	}
	
	
	exercise.generate = function() {
	
		// generate time signature first
		var beats = Math.floor(Math.random()*4 + 4); // 3/4 .. 7/4
		var time =  beats.toString() +  "/4"
		exercise.time = time;
		
		bar1 = generateBar(beats,4);
		bar2 = generateBar(beats,4);
		
		exercise.notes =  bar1.vtNotes +  bar2.vtNotes;
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse
	
	}
	
	exercise.clickActions = function(x,y) {
		console.log(x,y);
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}
		
		exercise.attempts += 1;
		var feedback = "";
		var color = "black";
		
		var notes = exercise.getNotes(0);
		previousX = notes[bar1.count-1].getAbsoluteX() + notes[bar1.count-1].width; // last note of first bar
		nextX = notes[bar1.count].getAbsoluteX() + notes[bar1.count].width;
		var drawX = x - exercise.canvasX; 
		//console.log(drawX, previousX, "next: ", nextX)
		if (drawX>= previousX && drawX<=nextX) { 
			feedback = "<b>Õige!</b>"
			exercise.score += 1;
			color = "green";
		} else {
			feedback = "<b>Vale koht!</b>";
			color = "red";
		}
		
		
		// add other staff with rendered barline
		var vt1 = exercise.createVexTabString();
		exercise.notes = bar1.vtNotes + " | " + bar2.vtNotes;
		var vt2 = exercise.createVexTabString(); // second staff
		exercise.draw(vt1 + "\n" + vt2)
		
		
		// draw barline where it was clicked with green or red color
		var context = exercise.renderer.getContext();
		var note = exercise.artist.staves[0].note;
		var drawY = note.getYForLine(0); 
		var height = note.getYForLine(4) - note.getYForLine(0)  
		context.rect(drawX, drawY, 2, height, { stroke: color,  fill: color});
		
		this.containerNode.getElementsByClassName("attempts")[0].innerHTML = exercise.attempts;
		this.containerNode.getElementsByClassName("score")[0].innerHTML = exercise.score;
		this.containerNode.getElementsByClassName("feedback")[0].innerHTML = feedback; 

		answered = true;
		
		if (exercise.testIsRunning() ) {
			// add info to test report
			exercise.testReport +=  exercise.currentQuestion.toString() +  " Tagasiside: " + feedback + "<br>";	
			exercise.nextQuestion(); 
		}
		
	}
	
	exercise.renew();		
	
	exercise.checkResponse = function() {
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		} else {
			alert("Kliki noodijoonestikul kohele, kus peaks olema taktijoon");
		}
	}
	
	return exercise;
}
