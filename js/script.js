// Conectar o HTML com JS 
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

// Lógica da Aplicação
class Calculator {
    constructor(previousOperationText,currentOperationText) {
        // Valores que são impressos na tela 
        this.previousOperationText = previousOperationText
        this.currentOperationText  = currentOperationText

        //Valor que o usuário está digitando
        this.currentOperation = ""
    }
    // Adicionar o digíto no visor da calculadora
    addDigit(digit) {
        //Checar se a operação atual já tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit

        // Atualizar a tela 
        this.updateScreen()
    }
    // Processar todas as operações da calculadora
    processOperation(operation) {

        // Checar se o valor atual está vazio 
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // Mudar a operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return;
        }
        
        // Pegar o valor atual e o valor anterior 
        let operationValue

        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current =  +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous+current
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "-":
            operationValue = previous-current
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "/":
                operationValue = previous/current
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "*":
                operationValue = previous*current
                this.updateScreen(operationValue,operation,current,previous)
                    break;
            case "DEL":
                    this.processDel()
                break;
            case "CE":
                    this.processClear()
                break;
            case "C":
                    this.processClearAll()
                break;
            case "=":
                    this.processEqual()
                break;

            default:
                return;
        }
    }

    // Mudar valores da tela da calculadora
    updateScreen(operationValue = null,operation = null,current=null,previous=null) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
           // Checar se o valor é o zero, se for adicione o valor atual
           if(previous===0) {
            operationValue = current
           }
           // Adicionar o valor atual para o "previous"
           this.previousOperationText.innerText = `${operationValue} ${operation}`
           this.currentOperationText.innerText = "";
        }
    }
    // Mudar a operação matemática 
    changeOperation(operation) {
        const mathOperation = ["*","/","+","-"]

        if(!mathOperation.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation
    }
    // Deletar o último digito
    processDel() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
    }
    // Deletar a operação atual
    processClear() {
        this.currentOperationText.innerText = ""
    }
    processClearAll() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    // Processar uma operação
    processEqual() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}
const calc = new Calculator(previousOperationText,currentOperationText)


buttons.forEach((btn)=> {
    btn.addEventListener('click',(e)=>{
        // Pegar o valor do botão que foi clicado
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
           calc.processOperation(value)
        }
        
    })
})