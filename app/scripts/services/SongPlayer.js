 (function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum(); 
          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
        var currentBuzzObject = null;
 /**
 @function playSong
 @desc plays the current song
 @ param ? Need help here
 
 
 **/        
    var playSong = function(){
        
        currentBuzzObject.play();
        song.playing = true;
        
    };
    
    var stopSong = function(){
        currentBuzzObject.stop();
        song.playing = null;
    };
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };
         
         var getSongIndex = function(song) {
             
             return currentAlbum.songs.indexOf(song);
 };
         
        SongPlayer.currentSong = null;
         
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
            setSong(song);
         currentBuzzObject.play(); 
                 
             } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
               playSong();
         }
     }
     };
         
          SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
     };
         
          SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
                   if (currentSongIndex < 0) {
                       stopSong();
                } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
     };
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
                   if (currentSongIndex > currentAlbum.songs.length) {
                       currentBuzzObject.stop();
                       SongPlayer.currentSong.playing = null;
                } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
     };
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();