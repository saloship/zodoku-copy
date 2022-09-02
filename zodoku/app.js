//to check the connection
// console.log(alert("working"));


// to display altered grid layout everytime the size is changed
const size= 9;
const  str = size.toString();
const set_grid_layout = "repeat("+str+",auto)";

let style_grid = document.querySelector("#main-grid");
style_grid.style.gridTemplateColumns = set_grid_layout;


// to make the grid

//l = dimension

const grid = function (l) {
    // let positions = [];
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
            // positions.push({i,j})
            const container = document.getElementById("main-grid");
            const cell = document.createElement("div");
            cell.id = (i + 1) + "-" + (j + 1);//the unique id format row_column
            cell.innerHTML = "";
            container.appendChild(cell);
            if( i ==2 || i==5){
                cell.classList.add("horizontalDivide")
            }
            if( j ==2 || j==5){
                cell.classList.add("verticalDivide")
            }
        }
    }
};
grid(size);
// shuffling the digits purpose: fill the diagonal boxes
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function shuffle( array ) {
    let newArray = [...array]
    for ( let i = newArray.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ newArray[ i ], newArray[ j ] ] = [ newArray[ j ], newArray[ i ] ];

    }
    // testing shuffling console.log(newArray);
    return newArray;


}

//shuffled digits
const num = shuffle(numArray);
// console.log(num);



// program to create a two dimensional array

function twoDimensionArray(a, b) {
    let arr = [];

    // creating two dimensional array
    for (let i = 0; i< a; i++) {
        for(let j = 0; j< b; j++) {
            arr[i] = [];
        }
    }

    // inserting elements to array
    for (let i = 0; i< a; i++) {
        for(let j = 0; j< b; j++) {
            arr[i][j] = g;
        }
    }
    return arr;
}


////GLOBAL ///
let r,c,n;
const g = null

let user_answers = twoDimensionArray(9,9);//initialise user_answer
let answerKey= [];
let puzzle = [];// for testing
let tester;  //used in validating the input position
let m ;//used in end answer check YET TO PUT TO WORK

//taking string from the textBox and passing to an array: answer in format r,c,n




//function to fill the diagonal boxes
function fillBox(row,col,arr,k){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let x = num[k];
            arr[row+i][col+j] = x;
            k++;

        }
    }
}

function fillDiagonal(arr){
    for(let i=0; i<9; i=i+3){
        fillBox(i,i,arr,0);
    }
    // console.log(arr);
    return arr
}


//solve function to solve the randomly filled fillDiagonal_array
// // ____FUNCTION DEFINITIONS____ // //

function solve(board) {
    // THIS FUNCTION WORKS.
    // Board -> Board
    // solves the given sudoku board
    // ASSUME the given sudoku board is valid
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}
const pokingHoles = (array)=> {
    let holes = (levelSelected())*12;
    m = holes;
    // const levelHole = Math.floor(Math.random() * (11 - 8 + 1) + 8)
    const temp = [...array];
    while (holes !== 0) {
        let v = num[Math.floor(Math.random() * 9)];
        let u = num[Math.floor(Math.random() * 9)];
        const w = null;
        if (temp[v - 1][u - 1] !== w) {
            temp[v - 1][u - 1] = w;
            holes--;
        }

    }
    return temp;
}

// ______TESTS______ //
// console.log(fillDiagonal(twoDimensionArray(9,9)))
// const check = fillDiagonal(twoDimensionArray(9, 9));

// ______TESTS______ //



function searchForSolution(boards){
    // List[Board] -> Board or false
    // finds a valid solution to the sudoku problem
    if (boards.length < 1){
        return false
    }
    else {
        // backtracking search for solution
        const first = boards.shift();
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


function solved(board){

    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

// ______TESTS______ //

// ______TESTS______ //


/// value for a and b is size
//value for holes is level


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)

}

let level;
const levelSelected = ()=>{
    const getLevel = document.getElementById("levels")
    const levelValue = getLevel.options[getLevel.selectedIndex].value
    level = levelValue;
    // console.log(levelValue);
    return levelValue;
}
levelSelected()

const clearTheBoard = ()=>{
    let clearCell;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = (i + 1) + "-" + (j + 1);
            clearCell = document.getElementById(cellId)
            clearCell.innerHTML ="";
            clearCell.style.background ="var(--white)"

        }
    }

    reset()
    start()

    displayGameBoard()
}

function mainPuzzle(){
    const first = twoDimensionArray(9,9)
    const baseArray = fillDiagonal(first)
    const solution = solve(baseArray)
    answerKey = [...solve(baseArray)];
    return pokingHoles(solution)
}
 let testPuzzle = mainPuzzle();
/*console.log(testPuzzle);
console.log(answerKey)*/



const displayGameBoard = ()=>{
     tester = mainPuzzle()
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(tester[i][j] !==null){
                const value = tester[i][j];
                // const strValue = value.toString()
                let cellId = (i+1) + "-" + (j+1);
                const puzzleDigits =document.getElementById(cellId)
                    puzzleDigits.innerHTML = value;
                // puzzleDigits.classList.add("bolder");


                puzzleDigits.style.color = "#3B4044";
                puzzleDigits.style.background = "#C7DBF0";

            }
            else {
                // console.log("empty")

            }
        }
    }
    // console.log(tester)
}
displayGameBoard();

const setGameBoard = ()=>{
    window.location.reload()

}

let checkBox = document.getElementById("autoCheck")
let textBox = document.getElementById('message');



/*textBox.addEventListener('change',(event)=>{});*/
textBox.addEventListener("keyup",(takeInput)=>{
// const takeInput=()=>{
    if (textBox.value.length === 3){


        r = textBox.value[0];
        c = textBox.value[1];
        n= textBox.value[2];
        autoInputCheck(r,c,n);
        // inputCheck(r,c,n)
        setTimeout(clearText,500)
        function clearText(){
            textBox.value = "";
        }
        // user_answers[(r-1)*size + (c-1)]= n;
        // textBox.value = "";

        // console.log(user_answers);



    }

})


function autoInputCheck(r,c,n){
    if((positionValid())&&(inputValid())&&(matchAnswer())){
        displayNumber(n);
        user_answers[(r-1)*size + (c-1)]= n;
        console.log("passed true")
    }
    else {
        // alert("err think harder");
            toast("err think harder")

        // console.log(positionValid());
        // console.log(inputValid());
        // console.log(matchAnswer());
        // console.log(n);

    }
}
function toast(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = text
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
}

//still to work on
function inputCheck(){
    if(positionValid()&&inputValid()){
    displayNumber(n)}
    let counter = 0;
    if (puzzleCompleted()){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (user_answers[i][j] === answerKey[i][j]) {// to work on: user_answer to compare with the array of poked out numbers
                    counter++
                }
            }
            return counter
        }
        if (counter== m){
            alert("you completed correctly")
        }
        else {
            alert("completed but its not correct")
        }
    }

}

const puzzleCompleted=()=>{
    let counter = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if(user_answers[i][j]!==null){
                counter++
            console.log(counter)
            }
        }
    }
    if(counter===m){
        alert("yay you completed it!")
        return true

    }
    return false
}
puzzleCompleted()




const positionValid=()=>{

    return c !== 0 && r !== 0 && tester[r - 1][c - 1] == null;
}

const inputValid = ()=>{
    return n >= 1 && n <= 9;
}

const matchAnswer = ()=>{
    return n == answerKey[r-1][c-1];// == as n is string and answerkey stores number

}
const displayNumber=(x)=>{
    let cellId = r + "-" + c;
    document.getElementById(cellId).innerHTML = x;
}



//
//solving sudoku inner functions
//


function nextBoards(board){
    // THIS FUNCTION WORKS.
    // Board -> List[Board]
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    const res = [];
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (let i = 1; i <= 9; i++){
            const newBoard = [...board];
            const row = [...newBoard[y]];
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board){
    // THIS FUNCTION WORKS.
    // Board -> [Int, Int]
    // (get the i j coordinates for the first empty square)
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

// ______TESTS______ //
// console.log(nextBoards(bd3))
// console.log(findEmptySquare(bd3))
// ______TESTS______ //

function keepOnlyValid(boards){
    // THIS FUNCTION WORKS.
    // List[Board] -> List[Board]
    // filters out all of the invalid boards from the list
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

// ______TESTS______ //

// ______TESTS______ //


function validBoard(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // checks to see if given board is valid
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each row
    for (let i = 0; i < 9; i++){
        const cur = [];
        for (let j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each column
    for (let i = 0; i < 9; i++){
        const cur = [];
        for (let j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board){
    // transform this everywhere to update res
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]]
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each box
    for (let y = 0; y < 9; y += 3){
        for (let x = 0; x < 9; x += 3){
            // each traversal should examine each box
            const cur = [];
            for (let i = 0; i < 9; i++){
                const coordinates = [...boxCoordinates[i]];
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}


let seconds = 0;
let tens = 0;
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
let Interval;

window.addEventListener("load",start)
     function start() {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }



     function stop() {
        clearInterval(Interval);
    }


    function reset() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    }




    function startTimer () {
        tens++;

        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9){
            appendTens.innerHTML = tens;

        }

        if (tens > 59) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        }

    }


//______________mobile version_____________________//

let numSelected = null;
window.onload = function() {
    setDigits();
}
let coor;

function getTile() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (tester[i][j] == null) {
                let cellId = (i + 1) + "-" + (j + 1);
                const touchTile = document.getElementById(cellId)
                touchTile.addEventListener("touchend", selectNumber);
                touchTile.addEventListener("touchend", coortoenter)
                console.log(touchTile.classList)

            }
        }
    }
}
getTile()

function setDigits() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("touchend", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
        number.addEventListener("touchend", test);
        // number.addEventListener("touchend", highlight)
        function highlight() {
        }
        function test(){

            let number = this.id;

            let r = parseInt(coor[0]);
            let c = parseInt(coor[2]);

            if (answerKey[r-1][c-1] == number) {


                const tile =document.getElementById(coor);
                tile.innerText = number;


            }
            else {
                toast("how about selecting a cell first?")
            }
        }

    }
}

function coortoenter(){
    coor = this.id
    return coor
}


function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
