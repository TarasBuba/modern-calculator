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
let brecketLeft = document.querySelector('#brecketLeft')
let brecketRight = document.querySelector('#brecketRight')
const displayWithBreckets = '';

//for all buttons
const allBtns = document.querySelectorAll('.buttons-grid button')
console.log(allBtns);



let currValue = '';
let prevValue = '';

let brecketLeftBtn;
let brecketRightBtn;
let counter = 0;

brecketLeft.addEventListener('click', (e) => {
    brecketLeftBtn = e.target.dataset.number;

    currValue += brecketLeftBtn;
    display.value = currValue;
    counter++


})
brecketRight.addEventListener('click', (e) => {
    if (counter > 0) {
        brecketRightBtn = e.target.dataset.number;
        currValue += brecketRightBtn;
        display.value = currValue;
        counter--
    }
})

numberBtn.forEach(number => {
    number.addEventListener('click', (e) => {
        
        currValue += e.target.dataset.number
        display.value = currValue;

    })
})
acBtn.addEventListener('click', (e) => {
    currValue = '';
    prevValue = '';

    display.value = '0'
    counter = 0
})
delBtn.addEventListener('click', (e) => {
    currValue = currValue.slice(0, -1);
    if (currValue === '') {
        display.value = '0'
    } else {

        display.value = currValue
    }
})


let currOperator = '';
operatorBtn.forEach(operator => {
    operator.addEventListener('click', (e) => {

        if (currValue.includes('(')) {
            currValue += e.target.dataset.operator;
            display.value = currValue;
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
            display.value = result
            prevValue = String(result);
            currValue = ''
            currOperator = e.target.dataset.operator;
            return
        }

        prevValue = currValue
        currValue = ''
        currOperator = e.target.dataset.operator
        display.value = `${prevValue}${currOperator}`



    })
})

point.addEventListener('click', (e) => {
    if (!currValue.includes('.')) {
        currValue = `${currValue}.`;
        display.value = currValue;
    }

})


equalBtn.addEventListener('click', (e1) => {
    let result;

    if (currValue.includes('(') && currValue.includes(')')) {
        // currValue += currOperator;
        // display.value = currValue;

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


})


persentBtn.addEventListener('click', (e) => {
    let result = persent(currValue);
    display.value = result
    currValue = String(result)
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










