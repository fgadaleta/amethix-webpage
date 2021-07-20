module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    svgstore: {
      options: {
        prefix: 'shape-',
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          height: 0
        }
      },
      default: {
        files: {
          'dest/sprite.html': ['src/companies/*.svg'],
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask('default', ['svgstore']);
};