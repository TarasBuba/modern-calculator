
// в загальному було створено 4 ф-ції для обрахунку(чекає рядок, для дужок окремо, для пріорітета символів та основна,яка передає значення в залежності чи є рядку Дужка чи не має), ШІ підсказв, що через парсер - це більш професійний підхід, от я і спробував.

let displayString = ''
const displayExpresion = document.getElementById('display');
const displayResult = document.getElementById('display2');
let result;
const allBtns = document.querySelectorAll('.buttons-grid button')
const display = displayExpresion;
let redFlag = false;
let regExpForNums = /[0-9]/

allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // let lastChar = display.value[display.value.length - 1]



        if (e.target.classList.contains('btn-equals')) {
            let result = mainChekingString(display.value.replaceAll('×', '*'));
            // в коді нижче через реплейс міняю всі * на х, для відображення на екрані, але коли передаю у ф-цію, міняю назад, найкраще, що зміг придумати)
            displayResult.value = result;
            displayString = String(result);

            if (displayResult.value !== '') {
                displayResult.classList.remove('display2')
                displayExpresion.classList.add('display2')
            }
            redFlag = true;
        }

// додав блок перевірки ---- коли після цифри йде дужка, додаєтсья * або коли є ) і ( дужки - між нижми теж додається множення, побачив на айфоні таке))
        if (e.target.classList.contains('btn-number') || e.target.classList.contains('btn-operator') || e.target.classList.contains('btn-special')) {
            let lastChar = display.value[display.value.length - 1];
            if (e.target.id === 'brecketLeft' && regExpForNums.test(lastChar) || lastChar === ')' && e.target.id === 'brecketLeft') {
                if (lastChar === '0') {
                    lastChar = ''
                }else {

                    displayString+='×'
                }

            }
            if (displayResult.value !== '') {
                displayResult.classList.add('display2');
                displayExpresion.classList.remove('display2');
            }
            if (redFlag === true && e.target.classList.contains('btn-number')) {
                displayString = '';
                displayString = e.target.dataset.symbols;
                display.value = displayString.replaceAll('*', '×');
                redFlag = false;

                return;
            } else if (redFlag === true && e.target.classList.contains('btn-operator')) {

                displayString = display.value + e.target.dataset.symbols
                display.value = displayString.replaceAll('*', '×')
                liveResults(displayExpresion.value)
                redFlag = false
                return;

            } else if (redFlag === false) {

                displayString += e.target.dataset.symbols
                display.value = displayString.replaceAll('*', '×');
                liveResults(display.value)
            }



        } else if (e.target.classList.contains('btn-action')) {
            if (e.target.id === 'ac') {
                display.value = '0'
                displayString = '';
                displayResult.value = '';
                redFlag = false;

            }
            else if (e.target.id === 'del') {
                // console.log(e.target);

                display.value = display.value.slice(0, -1)
                displayString = displayString.slice(0, -1)
                if (display.value === '') {
                    display.value = '0'
                    displayString = ''

                }
                redFlag = false;
                return;
            }
        }
        liveResults(display.value)



    })
})
const calcRegExp = /^[0-9+\-*/().\s×]+$/; // годину думав чого цей патерн не працює(множення), я просто забув додати туди 'x'
displayExpresion.addEventListener('input', (e) => {
    let currExpresion = e.target.value;
    liveResults(currExpresion)

})

function liveResults(currExpresion) {
    let arrOfSymbols = ['-', '+', '*', '/', '×'];
    let lastChar = currExpresion[currExpresion.length - 1]
    let preLastChar = currExpresion[currExpresion.length - 2]
    // console.log(lastChar);

    if (!calcRegExp.test(lastChar)) {
        displayExpresion.value = displayExpresion.value.slice(0, -1);
        displayString = displayExpresion.value.replaceAll('×', '*')
    }
    else if (preLastChar && arrOfSymbols.includes(lastChar) && arrOfSymbols.includes(preLastChar)) {
        displayExpresion.value = displayExpresion.value.slice(0, -1);
        // console.log('aaaaa');
        displayString = displayExpresion.value.replaceAll('×', '*')

    }

    else if (arrOfSymbols.includes(lastChar)) {
        // console.log('here');
        displayResult.value = ''
    }
    else {

        displayResult.value = mainChekingString(displayExpresion.value.replaceAll('×', '*'))
    }
}


function mainChekingString(anyString) {
    if (!anyString.includes('(')) {
        let finalResult = priorityOfSymbols(anyString)
        return finalResult;
    }
    else if (anyString.includes('(')) {
        let indexOPENBrechet = anyString.indexOf('(');
        let tempObj = mathInsideBreckets(anyString, indexOPENBrechet);
        let newStr = anyString.slice(0, indexOPENBrechet) + tempObj.insideBrecketsResult + anyString.slice(tempObj.indexOfCLOSEBreckets + 1)
        let finalResult = mainChekingString(newStr)
        return finalResult;
    }
}

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

    }

    if (numWithPoint !== '') {
        arrOfNumbers.push(numWithPoint)
    }
    let objOfElements = { arrOfNumbers, arrOfSymbols }
    return objOfElements
}

// console.log(checkingString(display.value));
function mathInsideBreckets(insideBreckets, indexOfPositionBrecket) {


    let insideBrecketsStr = '';
    let insideBrecketsResult;
    let objOfinsideBreckets = {};
    let indexOfCLOSEBreckets;
    let insideObj = {};

    for (let i = indexOfPositionBrecket; i < insideBreckets.length; i++) {
        if (insideBreckets[i] === '(') {

            insideObj = mathInsideBreckets(insideBreckets, i + 1);
            insideBrecketsStr += insideObj.insideBrecketsResult;
            i = insideObj.indexOfCLOSEBreckets;

        }


        if (insideBreckets[i] === ')') {

            indexOfCLOSEBreckets = Number(i)

            insideBrecketsResult = priorityOfSymbols(insideBrecketsStr);

            objOfinsideBreckets = { insideBrecketsResult, indexOfCLOSEBreckets }
            return objOfinsideBreckets;
        }
        if (insideBreckets[i] !== '(' && insideBreckets[i] !== ')') {

            insideBrecketsStr += insideBreckets[i]

        }
    }


}



function priorityOfSymbols(anyStr) {

    let objDisplay = checkingString(anyStr)

    let temporaryResSYM = objDisplay.arrOfSymbols
    let temporaryResNUM = objDisplay.arrOfNumbers

    if (temporaryResSYM.length === 0 && temporaryResNUM.length === 1) {
        return temporaryResNUM[0]
    }
    if (temporaryResSYM.length > temporaryResNUM.length || temporaryResSYM.length === 0 && temporaryResNUM.length === 0 || temporaryResSYM.length === temporaryResNUM.length) {
        return (anyStr = 'Error 666')
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
                return (anyStr = 'Error 666')
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
