//to check the connection
// console.log(alert("working"));


// to display altered grid layout everytime the size is changed
const size= 9;
const  str = size.toString();
const set_grid_layout = "repeat("+str+",auto)";

let style_grid = document.querySelector("#main-grid");
style_grid.style.gridTemplateColumns = set_grid_layout;


// to make the grid


let positions = [];
 var grid= function (l) {
     for (var i = 0; i < l; i++) {
         for (var j = 0; j < l; j++) {
              positions.push({i,j});

             var container = document.getElementById("main-grid");
              var cell = document.createElement("div");
             cell.id = (i+1)+"-"+(j+1) ;//the unique id format row_column
                 cell.innerHTML = "" ;
             container.appendChild(cell);
         }
     }
     // console.log(positions);
 }
 grid(size);


let r,c,n;
//initialise user_answer
var user_answers = [];
for( var i=0; i<size;i++){
    for(var j=0; j<size;j++){
        var x = 0;
        user_answers.push(0);
    }
}


//taking string from the textBox and passing to an array: answer in format r,c,n
let textBox = document.getElementById('message');

textBox.addEventListener('keydown', (event) => {
    let keyName = event.key;

    if (textBox.value.length >=3){


        r = textBox.value[0];
        c = textBox.value[1];
        n= textBox.value[2];
        user_answers[(r-1)*size + (c-1)]= n;

        console.log(user_answers);

        //display the answer

        var cellId = r+"-"+c;
        document.getElementById(cellId).innerHTML = n;

        textBox.value = "";

    }
    console.log(`key=${event.key},code=${event.code}`);
    console.log(textBox.value.length);

});





