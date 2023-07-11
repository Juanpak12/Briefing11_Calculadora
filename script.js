// se define una clase llamada Calculator
class Calculator {
  //constructor de la clase Calculator recibe dos argumentos: previousOperandTextElement y currentOperandTextElement, que representan los elementos HTML donde se mostrarán los operandos anteriores y actuales.
  constructor(previousOperandTextElement, currentOperandTextElement) {

    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    //this.clear() se llama para inicializar los operandos a valores vacíos.
    this.clear()
  }
// clear() método de la clase Calculator; se utiliza para borrar los operandos actuales y anteriores, así como la operación actual.
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
// delete()  método que se utiliza para eliminar el último carácter del operando actual.
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
//appendNumber(number) es el método que se utilizo para agregar un número al operando actual.
//Si el número es un punto decimal y el operando actual ya contiene un punto decimal, la función sale temprano y no realiza ninguna acción.
//De lo contrario, se concatena el número al operando actual.
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  //chooseOperation(operation) es el método que se utilizo para seleccionar la operación matemática.
  //Si no hay un operando actual, la función sale temprano y no realiza ninguna acción.
  //Si hay un operando anterior, se llama al método compute() para calcular el resultado anterior.
  //El operador seleccionado se asigna a la propiedad operation.
  //El operando anterior se establece en el operando actual y se restablece el operando actual.
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  //compute() es el método que se utilizo para realizar el cálculo matemático.
  //Las variables prev y current se inicializan con los valores numéricos de los operandos anterior y actual, respectivamente.
  //Si alguno de los operandos no es un número válido, la función sale temprano y no realiza ninguna acción.
  //Según el operador almacenado en la propiedad operation, se realiza la operación matemática correspondiente.
  //El resultado se asigna al operando actual, y se restablecen la operación y el operando anterior.


  // compute() realiza el cálculo matemático basado en los operandos anteriores y actuales, y el operador almacenado en la propiedad operation.
  compute() {
    //
    //computation es una variable local que se utiliza para almacenar el resultado del cálculo.
    let computation
    //prev se inicializa con el valor numérico del operando anterior convertido usando parseFloat().
    const prev = parseFloat(this.previousOperand)
    //current se inicializa con el valor numérico del operando actual convertido usando parseFloat()
    const current = parseFloat(this.currentOperand)
    //Si alguno de los operandos (prev o current) no es un número válido (por ejemplo, si el usuario ha ingresado un valor no numérico), la función sale temprano y no realiza ninguna acción utilizando la declaración if (isNaN(prev) || isNaN(current)) return;.
    if (isNaN(prev) || isNaN(current)) return
    //Si los operandos son números válidos, la función ejecuta un switch basado en el operador almacenado en la propiedad operation:
    switch (this.operation) {
      //Si el operador es '+', la función suma prev y current y almacena el resultado en computation.
      case '+':
        computation = prev + current
        break
      //Si el operador es '-', la función resta current de prev y almacena el resultado en computation.
      case '-':
        computation = prev - current
        break
      //Si el operador es '*', la función multiplica prev y current y almacena el resultado en computation.
      case '*':
        computation = prev * current
        break
      //Si el operador es '÷', la función divide prev por current y almacena el resultado en computation.
      case '÷':
        computation = prev / current
        break
      //Si el operador no coincide con ninguno de los casos anteriores, la función sale temprano y no realiza ninguna acción utilizando default: return;.
      default:
        return
    }
    //termina el bloque switch, se actualiza el operando actual (this.currentOperand) con el valor calculado (computation), y se restablecen las propiedades operation y previousOperand a sus valores iniciales (undefined y '', respectivamente).
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
//getDisplayNumber(number) es el método de la clase Calculator que se utilizo para dar formato al número antes de mostrarlo en la calculadora.
  getDisplayNumber(number) {
    //stringNumber almacena la representación en forma de cadena del número.
    const stringNumber = number.toString()
    //integerDigits se inicializa con la parte entera del número utilizando parseFloat(stringNumber.split('.')[0]).
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    //decimalDigits se inicializa con la parte decimal del número utilizando stringNumber.split('.')[1].
    const decimalDigits = stringNumber.split('.')[1]
    //integerDisplay es una variable local que se utilizará para almacenar el número formateado.
    let integerDisplay
    //Si integerDigits no es un número válido (por ejemplo, si el usuario ha ingresado un valor no numérico), integerDisplay se establece en una cadena vacía.
    //De lo contrario, si integerDigits es un número válido, se utiliza toLocaleString('en', { maximumFractionDigits: 0 }) para formatear integerDigits agregando separadores de miles y sin mostrar decimales. El resultado se asigna a integerDisplay.
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    //Si decimalDigits no es null, significa que el número tiene una parte decimal. En este caso, se devuelve ${integerDisplay}.${decimalDigits} para mostrar el número formateado con la parte entera y la parte decimal.
    //Si decimalDigits es null, significa que el número es un número entero sin parte decimal. En este caso, se devuelve solo integerDisplay.
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  
  }
//updateDisplay() es el método que actualiza los elementos HTML donde se muestra el operando actual y el operando anterior.
  updateDisplay() {
    //this.currentOperandTextElement.innerText se actualiza con el resultado del método getDisplayNumber() aplicado al operando actual.
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
      //Si hay una operación almacenada en la propiedad operation, se actualiza this.previousOperandTextElement.innerText con el resultado del método getDisplayNumber() aplicado al operando anterior y se concatena el operador.
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    //Si no hay una operación almacenada, se establece this.previousOperandTextElement.innerText en una cadena vacía.
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//numberButtons: Una variable que almacena una lista de elementos que tienen el atributo data-number.
const numberButtons = document.querySelectorAll('[data-number]')
//operationButtons: Una variable que almacena una lista de elementos que tienen el atributo data-operation.
const operationButtons = document.querySelectorAll('[data-operation]')
//equalsButton: Una variable que almacena el elemento que tiene el atributo data-equals.
const equalsButton = document.querySelector('[data-equals]')
//deleteButton: Una variable que almacena el elemento que tiene el atributo data-delete.
const deleteButton = document.querySelector('[data-delete]')
//allClearButton: Una variable que almacena el elemento que tiene el atributo data-all-clear.
const allClearButton = document.querySelector('[data-all-clear]')
//previousOperandTextElement: Una variable que almacena el elemento que tiene el atributo data-previous-operand.
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
//currentOperandTextElement: Una variable que almacena el elemento que tiene el atributo data-current-operand.
const currentOperandTextElement = document.querySelector('[data-current-operand]')
//se crea una instancia de la clase Calculator utilizando los elementos previousOperandTextElement y currentOperandTextElement como argumentos. Esta instancia de Calculator se asigna a la variable calculator, que se utilizará para realizar las operaciones y actualizar la interfaz de la calculadora.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

// boton modo oscuro 
const toggleButton = document.getElementById('toggleButton');
const body = document.body;

toggleButton.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
});