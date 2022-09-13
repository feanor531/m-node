// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
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
console.log(JSON.stringify(http, undefined, 2));