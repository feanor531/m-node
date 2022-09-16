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
    
    const homeDirectory =  headers['Host'].split('.')[0];
    if (uri === '/') uri = '/index.html';
    let path =  `${homeDirectory}${uri}`;
    
    try {
        body = require("fs")
                .readFileSync(path)
                .reduce((accum, elem) => accum += String.fromCodePoint(elem), '');
    } catch {
        status = 404;
    }
   
    switch (status) {
        case 200:
            massage = 'OK';
            break;        
        case 404:
            massage = 'Not Found';
            break;
    }

    if (status !== 200) body = massage.toLowerCase();
    
    let header = `Server: Apache/2.2.14 (Win32)
Content-Length: ${body.length}
Connection: Closed
Content-Type: text/html; charset=utf-8`;

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