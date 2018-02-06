import React, { Component } from 'react';
import '../node_modules/flexboxgrid/css/flexboxgrid.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flag_inp_num: false,
      val_inp_num: '',
      list_num_add: [12,1,45,11,2,5,4,3],
      Out: -1
    }

    this.btn_add = this.btn_add.bind(this);
    this.inp_key = this.inp_key.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
    this.ordenar = this.ordenar.bind(this);
  }
  btn_add () {
    let { list_num_add, val_inp_num } = this.state
    if (val_inp_num.length > 0) {
      list_num_add.push( parseInt(val_inp_num, 10) )
      this.setState(nw => ({
        list_num_add,
        val_inp_num: ''
      }))
    }
  }
  inp_key (event) {
    let { value } = event.target
    this.setState(nw => ({
      val_inp_num: value.replace(/[^0-9]/g, "")
    }))
  }
  pressEnter (event) {
    if (event.key === 'Enter') {
      this.btn_add()
    }
  }
  ordenar () {
    let { list_num_add } = this.state
    let j = 0, i = 1
    let retraso = 1000
    let time = setInterval(() => {
      if(list_num_add[j] > list_num_add[j+1]) {
        let aux = list_num_add[j+1];
        list_num_add[j+1] = list_num_add[j];
        list_num_add[j] = aux;
        this.setState(nw => ({
          list_num_add,
          Out: j + 1
        }))
      }
      j++
      if (j > (list_num_add.length - 1)) {
        i++
        j = 0
        if (i > list_num_add.length) {
          clearInterval(time)
        }
      }
    }, retraso)
  }
  render() {
    return (
      <div>
       <header className="header">
         <h1>Ordenador De Serie</h1>
       </header>
       <main className="main">
         <aside className="aside">
           <div className="aside__title"><b>Numero Entero</b></div>
           <div>
             <p>ingrese un numero entero...</p>
             <div className="aside__coneten_input">
               <input type="text" value={this.state.val_inp_num} onChange={this.inp_key} onKeyPress={this.pressEnter} disabled={this.state.flag_inp_num}/>
             </div>
             <div className="aside__coneten_btn">
               <button onClick={this.btn_add}>+ Add</button>
             </div>
             <div className="aside__coneten_btn">
               <button onClick={this.ordenar}>Ordenar</button>
             </div>
           </div>
         </aside>
         <section className="section">
          <div className="section__title"><b>Lista Ordenada</b></div>
          <div className="row contk">
            {
              this.state.list_num_add.map((val, key) => {
                return (
                  <div className={`col-xs-1 elem ${ (key === this.state.Out && key < (this.state.list_num_add.length - 1)) ? "elem--Out" : ""}`} key={key}>
                    <span>{val}</span>
                  </div>
                )
              })
            }
          </div>
         </section>
       </main>
       <footer></footer>
     </div>
    );
  }
}

export default App;
