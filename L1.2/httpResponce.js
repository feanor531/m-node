function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}
   
let contents = readHttpLikeInput();
   
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let response = `HTTP/1.1 ${statusCode} ${statusMessage}
${headers}

${body}`;
    console.log(response);
}
   
function processHttpRequest(method, uri, headers, body) {
    let status = 200;
    let massage;

    if (method.toUpperCase() != "GET" || uri.slice(4,10) !== "?nums=") status = 400;
    else if (uri.slice(0,4) !== "/sum") status = 404;
   
    switch (status) {
        case 200:
            massage = 'OK';
            break;
        case 400:
            massage = 'Bad Request';
            break;
        case 404:
            massage = 'Not Found';            
            break;
    }

    if (status !== 200) body = massage.toLowerCase();
    else {
        body = uri.slice(10,)
                .split(',')
                .reduce((accum, item) => accum += +item, 0)
                .toString()
    }

    let header = `Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${body.length}`;

    outputHttpResponse(status, massage, header, body);
}
   
function parseTcpStringAsHttpRequest(string) {
    let arr = string.split('\n');
    let firstLine = arr[0].split(' ');
    let bodyIndex = arr.findIndex(item => item === '');
    //make headers
    let header = arr.slice(1, bodyIndex).reduce((accum, item) => {
        const arr = item.split(':');
        return {...accum, [arr[0].trim()] : arr[1].trim()}
    }, {});
    return { 
        method : firstLine[0], 
        uri : firstLine[1], 
        headers :  header, 
        body : bodyIndex < 0 ? "" : arr[bodyIndex + 1], 
    }; 
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);