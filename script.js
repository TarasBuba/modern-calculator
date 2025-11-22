const numberBtn = document.querySelectorAll('.btn-number');
const operatorBtn = document.querySelectorAll('.btn-operator');
const actionBtn = document.querySelectorAll('.btn-action')
const acBtn = document.querySelector('#ac')
const delBtn = document.querySelector('#del')
const equalBtn = document.querySelector('.btn-equals');
const specialBtn = document.querySelectorAll('.btn-special')
const display = document.getElementById('display');
const persentBtn = document.querySelector('#persent')
const point = document.querySelector('#point')
const chahgeThemeBtn = document.querySelector('#change')



let displayString = ''
let brecketLeft = document.querySelector('#brecketLeft')
let brecketRight = document.querySelector('#brecketRight')
const displayWithBreckets = '';

//for all buttons
let currOperator = '';
let currValue = '';
let prevValue = '';

let brecketLeftBtn;
let brecketRightBtn;
let counterBreckets = 0;
let result;
const allBtns = document.querySelectorAll('.buttons-grid button')


function checkingString(str) {
    let staticArrOfSymbols = ['-', '+', '*', '/'];
    let arrOfNumbers = [];
    let arrOfSymbols = [];
    let numWithPoint = ''
    let regExpForNums = /[0-9]/
    for (let i = 0; i < str.length; i++) {
        if (regExpForNums.test(str[i])) {
            numWithPoint += str[i];
        }
        if (str[i] === '.' && !numWithPoint.includes('.')) {
            numWithPoint += str[i];
        }
        if (str[0] === '-' || str[i] === '-' && staticArrOfSymbols.includes(str[i - 1])) {
            numWithPoint += str[i]
        } else if (str[i] === '-' && !staticArrOfSymbols.includes(str[i - 1])) {
            arrOfNumbers.push(numWithPoint);
            arrOfSymbols.push(str[i]);
            numWithPoint = '';
        }

        if (staticArrOfSymbols.includes(str[i]) && numWithPoint !== '') {
            arrOfSymbols.push(str[i]);
            arrOfNumbers.push(numWithPoint);
            numWithPoint = '';
        }
        // if (str[i] === '(') {
        //   let newStr = mathInsideBreckets(str, i)
        //   str = str.slice(i, newStr.indexOfCLOSEBreckets)
        //   str[indexOfCLOSEBreckets] = newStr[str]



        //     }
    }

}
if (numWithPoint !== '') {
    arrOfNumbers.push(numWithPoint)
}
let objOfElements = { arrOfNumbers, arrOfSymbols }
return objOfElements

// console.log(checkingString(display.value));
function mathInsideBreckets(insideBreckets, indexOfPositionBrecket) {


    let insideBrecketsStr = '';
    let insideBrecketsResult;
    let objOfinsideBreckets = {}
    let indexOfCLOSEBreckets
    let indexOfOPENBreckets
    let insideObj = {}
    for (let i = indexOfPositionBrecket; i < insideBreckets.length; i++) {
        if (insideBreckets[i] === '(') {
            //  indexOfOPENBreckets = i;
            insideObj = mathInsideBreckets(insideBreckets, i + 1);
            insideBrecketsStr += insideObj.insideBrecketsResult;
            i = insideObj.indexOfCLOSEBreckets;

        }


        if (insideBreckets[i] === ')' && i !==insideObj.indexOfCLOSEBreckets) {
            indexOfCLOSEBreckets = Number(i)
            // insideBrecketsStr.push(insideObj.insideBreckets);
            let numsAndSyms = checkingString(insideBrecketsStr)
            insideBrecketsResult = priorityOfSymbols(numsAndSyms);

            objOfinsideBreckets = { insideBrecketsResult, indexOfCLOSEBreckets }
            return objOfinsideBreckets;
        }
        if (insideBreckets[i] !== '(' && insideBreckets[i] !== ')') {

            insideBrecketsStr += insideBreckets[i]

        }
    }

}



function priorityOfSymbols() {

    let objDisplay = checkingString(display.value)
    // console.log(obj);
    let temporaryResSYM = objDisplay.arrOfSymbols
    let temporaryResNUM = objDisplay.arrOfNumbers

    if (temporaryResSYM.length === 0 && temporaryResNUM.length === 1) {
        return temporaryResNUM[0]
    }
    if (temporaryResSYM.length > temporaryResNUM.length || temporaryResSYM.length === 0 && temporaryResNUM.length === 0 || temporaryResSYM.length === temporaryResNUM.length) {
        return (display.value = 'Error 666')
    }



    for (let i = 0; i < temporaryResSYM.length; i++) {
        if (temporaryResSYM[i] === '*') {
            let innerResult = Number(temporaryResNUM[i]) * Number(temporaryResNUM[i + 1])


            temporaryResNUM[i] = innerResult;
            temporaryResNUM.splice(i + 1, 1)
            temporaryResSYM.splice(i, 1)
            i--

        } else if (temporaryResSYM[i] === '/') {
            if (temporaryResNUM[i + 1] === '0') {
                return (display.value = 'Error 666')
            }
            let innerResult = Number(temporaryResNUM[i]) / Number(temporaryResNUM[i + 1])


            temporaryResNUM[i] = innerResult;
            temporaryResNUM.splice(i + 1, 1)
            temporaryResSYM.splice(i, 1)
            i--

        }
    }
    for (let i = 0; i < temporaryResSYM.length; i++) {
        if (temporaryResSYM[i] === '+') {
            let innerResult = Number(temporaryResNUM[i]) + Number(temporaryResNUM[i + 1])


            temporaryResNUM[i] = innerResult;
            temporaryResNUM.splice(i + 1, 1)
            temporaryResSYM.splice(i, 1)
            i--

        } else if (temporaryResSYM[i] === '-') {
            let innerResult = Number(temporaryResNUM[i]) - Number(temporaryResNUM[i + 1])


            temporaryResNUM[i] = innerResult;
            temporaryResNUM.splice(i + 1, 1)
            temporaryResSYM.splice(i, 1)
            i--

        }

    }
    return temporaryResNUM[0]


}


// console.log(allBtns);
allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-number')) {
            // currValue += e.target.dataset.number
            // display.value = currValue;
            displayString += e.target.dataset.number
            display.value = displayString;
        }
        if (e.target.classList.contains('btn-operator')) {

            if (currValue.includes('(')) {
                displayString += e.target.dataset.operator;
                display.value = displayString.replace('x', '*');
                return
            }

            if (prevValue !== '' && currValue !== '' && currOperator !== '') {
                if (currOperator === '+') {
                    result = add(prevValue, currValue)
                } else if (currOperator === '-') {
                    result = sub(prevValue, currValue)
                } else if (currOperator === '*') {
                    result = multi(prevValue, currValue)
                } else if (currOperator === '/') {
                    result = div(prevValue, currValue)
                }
                display.value = result.replace('x', '*')
                prevValue = String(result);
                currValue = ''
                currOperator = e.target.dataset.operator;
                return
            }

            prevValue = currValue
            currValue = ''
            currOperator = e.target.dataset.operator
            display.value = `${prevValue}${currOperator.replace('*', 'x')}`
        }


        if (e.target.classList.contains('btn-action')) {
            if (e.target.id === 'ac') {
                currValue = '';
                prevValue = '';

                display.value = '0'
                counterBreckets = 0
            } else {
                currValue = currValue.slice(0, -1);
                if (currValue === '') {
                    display.value = '0'
                } else {

                    display.value = currValue
                }
            }
        }
        if (e.target.classList.contains('btn-special')) {
            if (e.target.id === 'brecketLeft') {
                brecketLeftBtn = e.target.dataset.number;
                currValue += brecketLeftBtn;
                display.value = prevValue + currOperator + currValue;
                counterBreckets++
            } else if (e.target.id === 'brecketRight') {
                if (counterBreckets > 0) {
                    brecketRightBtn = e.target.dataset.number;
                    currValue += brecketRightBtn;
                    display.value = prevValue + currOperator + currValue;
                    counterBreckets--
                }
            }
            else if (e.target.id === 'persent') {
                let result = persent(currValue);
                display.value = result
                currValue = String(result)
            } else if (e.target.id === 'point') {
                if (!currValue.includes('.')) {
                    currValue = `${currValue}.`;
                    display.value = currValue;
                }
            }
        }
        if (e.target.classList.contains('btn-equals')) {

            if (currValue.includes('(') && currValue.includes(')')) {

                // currValue = currValue.replaceAll('x', '*')
                result = eval(currValue)
                display.value = result;
                currValue = String(result);
                prevValue = ''
                currOperator = ''
                return
            }

            if (currOperator === '') {
                display.value = currValue
                return
            }


            if (currOperator === '+') {
                result = add(prevValue, currValue)
            } else if (currOperator === '-') {
                result = sub(prevValue, currValue)
            } else if (currOperator === '*') {
                result = multi(prevValue, currValue)
            } else if (currOperator === '/') {
                result = div(prevValue, currValue)
            }
            display.value = result
            prevValue = String(result);
            currValue = '';
            currOperator = '';

            // return result;
        }
    })
})






function add(num1, num2) {
    let res = Number(num1) + Number(num2)
    return res
}
function sub(num1, num2) {
    let res = Number(num1) - Number(num2)
    return res
}
function multi(num1, num2) {
    let res = Number(num1) * Number(num2)
    return res
}
function div(num1, num2) {
    if (Number(num2) === 0) {
        return 'Error';
    }
    let res = Number(num1) / Number(num2)
    return res;
}
function persent(num1) {
    let persent = num1 / 100;
    return persent
}










