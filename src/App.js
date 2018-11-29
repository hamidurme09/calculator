import React, { Component } from 'react';
import './App.css';

class Calculator extends Component {
  state = {
    value: null,
    displayValue : '0',
    waitingforoprerate: false,
    operator: null
  }

  inputDigit(digit) {
    const {displayValue, waitingforoprerate} = this.state
    if(waitingforoprerate) {
      this.setState({
        displayValue: String(digit),
        waitingforoprerate: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
    
  }

  inputDot() {
    const {displayValue, waitingforoprerate} = this.state

    if(waitingforoprerate) {
      this.setState({
        displayValue: '.',
        waitingforoprerate: false
        
      })
    } else if(displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingforoprerate: false
      })
    }
  }

  clearValue() {
    this.setState({
      displayValue: '0'
    })
  }

  toggleSign() {
    const {displayValue} = this.state
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  inputPercent() {
    const {displayValue} = this.state
    const value = parseFloat(displayValue)
    this.setState({
      displayValue: String(value / 100)
    })
  }

  performOpreration(nextOperator) {
    const {displayValue, operator, value} = this.state
    const nextValue = parseFloat(displayValue)

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      // No previous value, hit a operator key
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue)
      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }

    
    this.setState({
      waitingforoprerate: true,
      operator: nextOperator
    })
  }
  


  render() {
    const {displayValue} = this.state;
    return (

      <div className="App">
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
       
    <div id="background">

<div id="result">{displayValue}</div>

 <div id="main">
     <div id="first-rows">
      <button className="del-bg " id="delete" onClick={() => this.clearValue()}>Del</button>
      <button className="btn-style operator opera-bg fall-back" onClick={() => this.toggleSign()}>&plusmn;</button>
         <button value="%" className="btn-style operator opera-bg fall-back" onClick={() => this.inputPercent()}>%</button>
         <button value="+" className="btn-style opera-bg value align operator" onClick={() => this.performOpreration('+')}>+</button>
         </div>

       <div className="rows">
     <button value="7" className="btn-style num-bg num first-child" onClick={() => this.inputDigit(7)}>7</button>
         <button value="8" className="btn-style num-bg num" onClick={() => this.inputDigit(8)}>8</button>
         <button value="9" className="btn-style num-bg num" onClick={() => this.inputDigit(9)}>9</button>
         <button value="-" className="btn-style opera-bg operator" onClick={() => this.performOpreration('-')}>-</button>
         </div>

         <div className="rows">
         <button value="4" className="btn-style num-bg num first-child" onClick={() => this.inputDigit(4)}>4</button>
         <button value="5" className="btn-style num-bg num" onClick={() => this.inputDigit(5)}>5</button>
         <button value="6" className="btn-style num-bg num" onClick={() => this.inputDigit(6)}>6</button>
         <button value="*" className="btn-style opera-bg operator" onClick={() => this.performOpreration('*')}>x</button>
         </div>

         <div className="rows">
         <button value="1" className="btn-style num-bg num first-child" onClick={() => this.inputDigit(1)}>1</button>
         <button value="2" className="btn-style num-bg num" onClick={() => this.inputDigit(2)}>2</button>
         <button value="3" className="btn-style num-bg num" onClick={() => this.inputDigit(3)}>3</button>
         <button value="/" className="btn-style opera-bg operator" onClick={() => this.performOpreration('/')}>/</button>
         </div>

         <div className="rows">
         <button value="0" className="num-bg zero" id="delete" onClick={() => this.inputDigit(0)}>0</button>
         <button value="." className="btn-style num-bg period fall-back" onClick={() => this.inputDot()}>.</button>
         <button value="=" id="eqn-bg" className="eqn align" onClick={() => this.performOpreration('=')}>=</button>
         </div>

     </div>

 </div>

      </div>
    );
  }
}

export default Calculator;

