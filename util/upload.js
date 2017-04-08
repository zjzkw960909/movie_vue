var fs = require('fs');
var formidable = require('formidable');

module.exports = function (app, path, uploadDir) {
    app.post(path, function (req, res, next) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) throw err;
            var files_path = [];
            var files = files.file;
            var fName = (new Date()).getTime();
            fs.exists(uploadDir, function (exists) {
                if (!exists) {
                    fs.mkdir(uploadDir, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('succ');
                        }
                    });
                }
            });
            var dir = uploadDir + fName + '.jpg';
            if( files.length == undefined ){
                fs.rename(files.path, dir, function (err) {
                    if( err ){
                        throw err;
                    } else {
                        res.json({path: dir});
                        res.end();
                    }
                });
            }else{
                for(var k in files){
                    var file = files[k];
                    fs.rename(file.path, dir, function (err) {
                        if( err ){
                            throw err;
                        } else {
                            var temp = dir.split('/');
                            temp.splice(1,1);
                            temp = temp.join('/');
                            files_path.push(dir);
                        }
                        if( files.length == files_path.length ){
                            res.json({path: files_path});
                            res.end();
                        }
                    });
                }
            }
        })
    })
};

