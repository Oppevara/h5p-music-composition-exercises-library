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
H5P.MusicCompositionExercisesLibrary = (function($) {
  /**
   * Constructor function
   * @constructor
   */
  function MusicCompositionExercisesLibrary() {}

  MusicCompositionExercisesLibrary.generateHtml = function($wrapper, context) {
    // XXX Variable 'context' could be used to get access to exercise within that context
    throw 'Not Implemented';
  };

  return MusicCompositionExercisesLibrary;
})(H5P.jQuery);
