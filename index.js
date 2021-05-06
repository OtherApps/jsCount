const express = require('express')
const serveIndex = require('serve-index')
var http = require('http');
var formidable = require('formidable');
const url = require('url');
var fs = require('fs');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();

var outPut=""; 
var howmanytimes=0; 

 
app.use(express.urlencoded({
  extended: true
}))
app.get('/', (req, res) => {
 loadFile(res,"./public/index.html"); 
 
  
})


app.post('/search', (req, res) => {

var searchfor= req.body.searchforme
//console.log(searchfor);
 //console.log (req.body.search_form.searchforme.value);
  
// loadFile(res,"./public/error.html"); 
 search_forme(searchfor); 
 
outPut += howmanytimes+" AVG # <b> " + howmanytimes /108 + "</b>"; 
 res.write(outPut); 
// res.close(); 
 
})

function search_forme(searchfor1){
	
	console.log("With in function \r");
	var results=0; 
	// open dir
	fs.readdirSync("./closeCaption/").forEach(file => {
 

findme(file,searchfor1);


	
	});
	
	
	
	return results; 
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}



function findme(file_name,find_string){

const data = fs.readFileSync("./closeCaption/"+file_name,
            { flag:'r'});
//indexOf(find_string)>0
if(data.indexOf(find_string)>0)
{


	
	
outPut += " " + file_name + " \t found it here \n\r"; 
howmanytimes=howmanytimes+ occurrences(data,find_string) ;
//console.log(howmanytimes); 
}

	
}


function loadFile(response,filename){




response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./'+filename, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
      response.end();
	  
	  
	  
    });


  
}

app.listen(3000, () => console.log('🚀 is on port 3000...'))
