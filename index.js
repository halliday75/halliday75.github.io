function selectSquare(a) {
    let value = document.getElementById(a).innerHTML;
    let secretInt = parseInt(document.getElementById('secret').innerHTML);
        //check if the number is even
        if(secretInt == 0 || secretInt % 2 == 0) {
           document.getElementById(a).innerHTML = "X";
           document.getElementById('secret').innerHTML = secretInt + 1;
        }
    
        // if the number is odd
        else {
           document.getElementById(a).innerHTML = "O";
           document.getElementById('secret').innerHTML = secretInt + 1;
        }
        let squareOne = document.getElementById('1').innerHTML;
        let squareTwo = document.getElementById('2').innerHTML;
        let squareThree = document.getElementById('3').innerHTML;
        let squareFour = document.getElementById('4').innerHTML;
        let squareFive = document.getElementById('5').innerHTML;
        let squareSix = document.getElementById('6').innerHTML;
        let squareSeven = document.getElementById('7').innerHTML;
        let squareEight = document.getElementById('8').innerHTML;
        let squareNine = document.getElementById('9').innerHTML;
        function isWinner(a,b,c){
            document.getElementById(a).style.color = "red";
            document.getElementById(b).style.color = "red";
            document.getElementById(c).style.color = "red";
            document.getElementById('status').innerHTML = document.getElementById(a).innerHTML + " is the winner!"; 
        }
        if (squareOne != ' ' && squareOne == squareTwo && squareTwo == squareThree) { 
            isWinner('1','2','3');
         }  else if (squareFour != ' ' && squareFour == squareFive && squareFive == squareSix) {
            isWinner('4','5','6');
        }   else if (squareSeven != ' ' && squareSeven == squareEight && squareEight == squareNine) {
            isWinner('7','8','9');
        }   else if (squareOne != ' ' && squareOne == squareFour && squareFour == squareSeven) {
            isWinner('1','4','7');
        }   else if (squareTwo != ' ' && squareTwo == squareFive && squareFive == squareEight) {
            isWinner('2','5','8');
        }   else if (squareThree != ' ' && squareThree == squareSix && squareSix == squareNine) {
            isWinner('3','6','9');
        }   else if (squareOne != ' ' && squareOne == squareFive && squareFive == squareNine) {
            isWinner('1','5','9');
        }   else if (squareThree != ' ' && squareThree == squareFive && squareFive == squareSeven) {
            isWinner('3','5','7');
        }   
    }
