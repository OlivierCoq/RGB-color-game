module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Minifying JavaScript files here:
    uglify: {
      build: {
        src: 'JS/ColorGameRef.js',
        dest: 'JS/ColorGameRef.min.js'
      }
    },    
      //Minifying CSS files here:
    cssmin : {
        target : {
            src : ["CSS/ColorGame.css"],
            dest : "CSS/ColorGame.min.css"
        }
    }    
  });

    
//Registering and loading Grunt Plugins: 
    
  // loading uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(.
  grunt.registerTask('default', ['uglify']);   
    //Load CSS minifier
  grunt.loadNpmTasks('grunt-contrib-cssmin');    
    //Default
  grunt.registerTask('default', ['cssmin']);    
};