/**
 * Music Composition Exercises Editor library
 */

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
        exercise = nameKey("major", containerNode, canvasClassName);
        break;
      case '7.3':
        exercise = nameKey("minor", containerNode, canvasClassName);
        break;
      case '7.4':
        exercise = buildScale("major", containerNode, canvasClassName);
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
      'class': 'h5p-music-compositon-exercises-play',
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
          $testDiv.show();
          $testDiv.css('visibility', 'visible');
          H5P.trigger(context, 'resize');
        }
      },
      'appendTo': $results
    });
    var $testDiv = $('<div>', {
      'class': 'testDiv',
      'style': 'display:none;',
      'text': 'Kas soovite tulemuse salvestada pdf faili (nt esitamiseks õpetajale)? '
    }).appendTo($container);

    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-make-pdf-button makePdfButton',
      'html': 'Jah',
      'on': {
        'click': function() {
          $pdfDiv.show();
          context.exercise.saveToPdf = true;
          H5P.trigger(context, 'resize');
        }
      },
      'appendTo': $testDiv
    });
    JoubelUI.createButton({
      'class': 'h5p-music-compositon-exercises-hide-pdf-button hidePdfButton',
      'html': 'Ei',
      'on': {
        'click': function() {
          $pdfDiv.hide();
          context.exercise.saveToPdf = false;
          H5P.trigger(context, 'resize');
        }
      },
      'appendTo': $testDiv
    });
    var $pdfDiv = $('<div>', {
      'class': 'h5p-music-compositon-exercises-pdf-div pdfDiv',
      'style': 'display:none;',
      'text': 'Nimi: '
    }).append($('<input>', {
      'type': 'text',
      'class': 'name',
      'size': '20'
    })).appendTo($testDiv);
    $('<br>').appendTo($testDiv);
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
      'html': 'Teile esitatakse <span class="maxQuestions">5</span> küsimust, mis tuleb ettemääratud aja jooksul vastata. Kui jõuate varem valmis, vajutage lihtsalt "Vasta". Uus küsimus kuvatakse peale eelmise vastamist või aja täitumisel.'
    })).appendTo($testDiv);
  };

  MusicCompositionExercisesLibrary.setMaxQuestions = function(context, $container, maxQuestions) {
    if ( context.exercise ) {
      context.exercise.maxQuestions = maxQuestions;
      $container.find('span.maxQuestions').text(maxQuestions);
    }
  };

  return MusicCompositionExercisesLibrary;
})(H5P.jQuery, H5P.JoubelUI);
