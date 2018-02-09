/**
 * Music Composition Exercises Editor library
 */

 // It would be useful to load those as H5P dependencies, but those seem to want to attach themselves to global window object
 (function(){
   if (window.VEXTAB_LOADED === true) return;
   window.VEXTAB_LOADED = true;
   var script = document.createElement("script");
   // XXX This should be loaded from here: https://unpkg.com/vextab@2.0.13/releases/vextab-div.js
   script.src = "https://unpkg.com/vextab/releases/vextab-div.js";
   document.head.appendChild(script);
 })();
 (function(){
   if (window.WEB_AUDIO_FONT_PLAYER_LOADED === true) return;
   window.WEB_AUDIO_FONT_PLAYER_LOADED = true;
   var script = document.createElement("script");
   // XXX This should either become part of the library or come from CDN
   script.src = "https://surikov.github.io/webaudiofont/npm/dist/WebAudioFontPlayer.js";
   document.head.appendChild(script);
 })();
 (function(){
   if (window.WEB_AUDIO_SOND_LOADED === true) return;
   window.WEB_AUDIO_SOND_LOADED = true;
   var script = document.createElement("script");
   // XXX This should either become part of the library or come from CDN
   script.src = "https://surikov.github.io/webaudiofontdata/sound/0000_JCLive_sf2_file.js";
   document.head.appendChild(script);
 })();
 (function(){
   if (window.JSPDF_LOADED === true) return;
   window.JSPDF_LOADED = true;
   var script = document.createElement("script");
   // XXX This should either become part of the library or come from CDN
   script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js";
   document.head.appendChild(script);
 })();

var H5P = H5P || {};

// XXX This does not seem to get exposed
H5P.MusicCompositionExercisesLibrary = (function($, JoubelUI) {
  /**
   * Constructor function
   * @constructor
   */
  function MusicCompositionExercisesLibrary() {}

  MusicCompositionExercisesLibrary.createExerciseInstance = function(type, containerNode, canvasClassName) {
    var exercise = null;

    switch(type) {
      case '1.1':
        exercise = recognizeDuration(containerNode, canvasClassName);
        break;
      case '1.2':
        exercise = nameDuration(containerNode, canvasClassName);
        break;
      case '1.3':
        exercise = findMissingDuration(containerNode, canvasClassName);
        break;
      case '1.4':
        exercise = drawBarlines(containerNode, canvasClassName);
        break;
      case '1.5':
        exercise = findTime(containerNode, canvasClassName);
        break;
      case '2.5':
        exercise = describeNote("treble", containerNode, canvasClassName);
        break;
      case '2.6':
        exercise = describeNote("bass", containerNode, canvasClassName);
        break;
      case '2.7':
        exercise = noteFromNoteName("treble", containerNode, canvasClassName);
        break;
      case '2.8':
        exercise = noteFromSyllable("treble", containerNode, canvasClassName);
        break;
      case '2.9':
        exercise = noteFromNotation("treble", containerNode, canvasClassName);
        break;
      case '2.10':
        exercise = noteFromKeyboard("treble", containerNode, canvasClassName);
        break;
      case '2.11':
        exercise = noteFromNoteName("bass", containerNode, canvasClassName);
        break;
      case '2.12':
        exercise = noteFromSyllable("bass", containerNode, canvasClassName);
        break;
      case '2.13':
        exercise = noteFromNotation("bass", containerNode, canvasClassName);
        break;
      case '2.14':
        exercise = noteFromKeyboard("bass", containerNode, canvasClassName);
        break;
      case '2.15':
        exercise = enharmonism("name", containerNode, canvasClassName);
        break;
      case '2.16':
        exercise = enharmonism("syllable", containerNode, canvasClassName);
        break;
      case '2.17':
        exercise = changeClef("bass", containerNode, canvasClassName);
        break;
      case '2.18':
        exercise = changeClef("treble", containerNode, canvasClassName);
        break;
      case '2.19':
        exercise = octaveFromNotation("treble", containerNode, canvasClassName);
        break;
      case '2.20':
        exercise = octaveFromNotation("bass", containerNode, canvasClassName);
        break;
      case '3.1':
        exercise = buildInterval("treble", "up", containerNode, canvasClassName);
        break;
      case '3.2':
        exercise = buildInterval("treble", "down", containerNode, canvasClassName);
        break;
      case '3.3':
        exercise = buildInterval("bass", "up", containerNode, canvasClassName);
        break;
      case '3.4':
        exercise = buildInterval("bass", "down", containerNode, canvasClassName);
        break;
      case '3.5':
        exercise = buildChord("treble", "up", containerNode, canvasClassName);
        break;
      case '3.6':
        exercise = buildChord("treble", "down", containerNode, canvasClassName);
        break;
      case '3.7':
        exercise = buildChord("bass", "up", containerNode, canvasClassName);
        break;
      case '3.8':
        exercise = buildChord("bass", "down", containerNode, canvasClassName);
        break;
      case '7.1':
        exercise = recognizeKeySignature(containerNode, canvasClassName);
        break;
      case '7.2':
        exercise = buildScale("major", containerNode, canvasClassName);
        break;
      case '7.3':
        exercise = nameKey("major", containerNode, canvasClassName);
        break;
      case '7.4':
        exercise = nameKey("minor", containerNode, canvasClassName);
        break;
      default:
        throw 'invalidExerciseType';
    }

    return exercise;
  };

  MusicCompositionExercisesLibrary.generateHtml = function(context, $container) {
    $('<h2>', {
      'class': 'exerciseTitle'
    }).appendTo($container);
    $('<p>', {
      'class': 'description'
    }).appendTo($container);
    $('<br>').appendTo($container);
    JoubelUI.createButton({
      'class': 'h5pf-music-compositon-exercises-play',
      'html': 'Mängi',
      'on': {
        'click': function() {
          context.exercise.play();
        }
      },
      'appendTo': $container
    });
    $('<div>', {
      'class': 'mainCanvas'
    }).appendTo($container);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-renew',
      'html': 'Uuenda',
      'on': {
        'click': function() {
          $feedback.html('');
          context.exercise.renew();
        }
      },
      'appendTo': $container
    });
    $('<br>').appendTo($container);
    $('<span>', {
      'class': 'question'
    }).appendTo($container);
    $('<span>', {
      'class': 'responseDiv'
    }).appendTo($container);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-reply',
      'html': 'Vasta',
      'on': {
        'click': function() {
          context.exercise.checkResponse();
        }
      },
      'appendTo': $container
    });
    var $feedback = $('<p>', {
      'class': 'feedback'
    }).appendTo($container);
    var $attempts = $('<label>', {
      'class': 'attempts',
      'text': '0'
    });
    $('<span>', {
      'text': 'Katseid: '
    }).append($attempts).appendTo($container);
    var $score = $('<label>', {
      'class': 'score',
      'text': '0'
    });
    $('<span>', {
      'text': '. Neist õigeid vastuseid: '
    }).append($score).appendTo($container);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-reset',
      'html': 'Nulli',
      'on': {
        'click': function() {
          context.exercise.attempts = 0;
          context.exercise.score = 0;
          $attempts.text('0');
          $score.text('0');
        }
      },
      'appendTo': $container
    });
    $('<br>').appendTo($container);
    var $results = $('<div>', {
      'html': 'Kui tunned, et oled valmis <b>testi sooritama</b>, vajuta: ',
      'class': 'resuts'
    }).appendTo($container);
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-show-test showTestButton',
      'html': 'Test',
      'on': {
        'click': function() {
          $testDiv.css('visibility', 'visible');
        }
      },
      'appendTo': $results
    });
    $('<br>').appendTo($container);
    var $testDiv = $('<div>', {
      'class': 'testDiv',
      'style': 'visibility:hidden;',
      'text': 'Kas soovite tulemuse salvestada pdf faili (nt esitamiseks õpetajale)? '
    }).appendTo($container);

    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-make-pdf-button makePdfButton',
      'html': 'Jah',
      'on': {
        'click': function() {
          $pdfDiv.css('visibility', 'visible');
          context.exercise.saveToPdf = true;
        }
      },
      'appendTo': $testDiv
    });
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-hide-pdf-button hidePdfButton',
      'html': 'Ei',
      'on': {
        'click': function() {
          $pdfDiv.css('visibility', 'hidden');
          context.exercise.saveToPdf = false;
        }
      },
      'appendTo': $testDiv
    });
    var $pdfDiv = $('<div>', {
      'class': 'h5p-music-compositon-exercises-pdf-div pdfDiv',
      'style': 'visibility:hidden;',
      'text': 'Nimi: '
    }).append($('<input>', {
      'type': 'text',
      'class': 'name',
      'size': '20'
    })).appendTo($testDiv);
    $testDiv.append('Küsimus nr <b><label class="questionNumber">0</label></b>. Aega on: <b><label  class="timer">0</label></b> sekundit.<br> Aega kulunud kokku: <b><label class="totalTestTime">0</label></b> sekundit.<br>');
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-start-test startTest',
      'html': 'Alusta',
      'on': {
        'click': function() {
          context.exercise.startTest();
        }
      },
      'appendTo': $testDiv
    });
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-stop-test stopTest',
      'html': 'Peata',
      'on': {
        'click': function() {
          context.exercise.stopTest();
        }
      },
      'appendTo': $testDiv
    });
    $('<br>').appendTo($testDiv);
    $('<p>').append($('<small>', {
      'text': 'Teile esitatakse 5 küsimust, mis tuleb ettemääratud aja jooksul vastata. Kui jõuate varem valmis, vajutage lihtsalt "Vasta". Uus küsimus kuvatakse peale eelmise vastamist või aja täitumisel.'
    })).appendTo($testDiv);
  };

  return MusicCompositionExercisesLibrary;
})(H5P.jQuery, H5P.JoubelUI);
