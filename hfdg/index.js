/**
 *
 * @version             1.0
 * @description         Node Js script
 */

var spawn = require('child_process').spawn;
var args = ["./phantomjs_script.js"];

// In case you want to customize the process, modify the options object
var options = {};

// If phantom is in the path use 'phantomjs', otherwise provide the path to the phantom phantomExecutable
// e.g for windows:
// var phantomExecutable = 'E:\\Programs\\PhantomJS\\bin\\phantomjs.exe';
// Or copy phantomjs.exe to C:\windows\phantomjs.exe
var phantomExecutable = './phantomjs.exe';

/**
 * This method converts a Uint8Array to its string representation
 */
function Uint8ArrToString(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
};

var child = spawn(phantomExecutable, args, options);

var page_loaded = false;


//====================================================
var http = require('http');

//API function
/**
 *
 * Get All HTML Code of the page
 *
 * @return  String     HTML Code
 */
const get_all_html = () => {
    return new Promise((resolve, reject) => {
        var options = {
            host: '127.0.0.1',
            port: 60001,
            path: '/?full=yes'
        };
        http.get(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(body));
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });
    });
}

/**
 *
 * Get Href Attribute from alt attr of image
 * --------------------------------
 * @param alt_value
 *
 * @return      String Href Attribute
 */

const get_href_from_alt = alt_value => {
    return new Promise((resolve, reject) => {
        var options = {
            host: '127.0.0.1',
            port: 60001,
            path: '/?alt='+alt_value
        };
        http.get(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(body));
        }).on('error', reject);
    });
};
//====================================================
var test_example_alt = [
    'Ewhjnr5czsg',
    'Mfmc4xu1uhk',
    'E9tge hrtg0',
    'Upyueolh5wy',
    'Xuwquwojt i',
    'Ur10uolgsni'
];

// Receive output of the child process
child.stdout.on('data', function(data) {
    var textData = Uint8ArrToString(data);
    if(textData.trim() === 'ok') {
        page_loaded = true;

        var cnt = 0;
        var test_data_length = test_example_alt.length - 1;
        setInterval(() => {
            if(cnt > test_data_length) {
                cnt = 0;
            }
            async function f1() {
                var href_value = await get_href_from_alt(encodeURIComponent(test_example_alt[cnt]));
                console.log(href_value);
            }
            f1();
            cnt ++;
        }, 500);
    }
});

// Receive error output of the child process
child.stderr.on('data', function(err) {
    var textErr = Uint8ArrToString(err);
    console.log(textErr);
});

// Triggered when the process closes
child.on('close', function(code) {
    console.log('Process closed with status code: ' + code);
});