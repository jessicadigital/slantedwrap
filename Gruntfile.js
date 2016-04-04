module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less:{
            options:{
                compress:true,
                optimization:1,
                yuicompress:true
            },
            css:{
                files:{
                    'dist/css/jquery.slantedwrap.css':[
                        'src/less/jquery.slantedwrap.less'
                    ],
                }
            }
        },
        uglify:{
            js:{
                files:{
                    'dist/js/jquery.slantedwrap.min.js':[
                        'src/js/jquery.slantedwrap.js'
                    ]
                }
            }
        }
    });
    
    grunt.registerTask('default', ['less:css','uglify:js']);
};
