function calculateExpression() {
    let input = document.getElementById("expression").value;
    let resultDiv = document.getElementById("result");

    try {
        let result = evaluateExpression(input);
        resultDiv.innerText = "Result: " + result;
    } catch (error) {
        resultDiv.innerText = "Invalid Expression!";
    }
}

function evaluateExpression(s) {
    let stack = [];
    let num = 0;
    let sign = '+';

    function evaluate() {
        let numStack = [];
        let num = 0;
        let sign = '+';

        while (stack.length > 0) {
            let token = stack.pop();
            if (typeof token === "number") {
                num = token;
            } else if (token === '(') {
                break;
            } else {
                sign = token;
                continue;
            }

            if (sign === '+') {
                numStack.push(num);
            } else if (sign === '-') {
                numStack.push(-num);
            } else if (sign === '*') {
                numStack.push(numStack.pop() * num);
            } else if (sign === '/') {
                numStack.push(Math.trunc(numStack.pop() / num));
            }
        }
        return numStack.reduce((a, b) => a + b, 0);
    }

    for (let i = 0; i < s.length; i++) {
        let char = s[i];

        if (!isNaN(char) && char !== ' ') {
            num = num * 10 + parseInt(char);
        } else if ("+-*/(".includes(char)) {
            stack.push(num);
            num = 0;
            stack.push(char);
        } else if (char === ')') {
            stack.push(num);
            num = 0;
            stack.push(evaluate());
        }
    }

    stack.push(num);
    return evaluate();
}
