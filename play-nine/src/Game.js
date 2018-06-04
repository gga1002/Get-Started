import React, { Component } from 'react';
import _ from 'underscore';



const Stars = (props) => {
  return( 
    <div className="col-xs-12 col-sm-5 col-md-5">
          {_.range(props.numberOfStars).map((number, i) =>
              <i key={i} className="fa fa-star"></i>
          )}
    </div>
  );
}
  
const Buttons =(props) =>{

    return( 
        <div className="buttons-column col-xs-12 col-sm-2 col-md-2">
            
            <button className="btn btn-default" onClick={props.resetGame}>
            <i className="fas fa-sync-alt"></i></button>

            <button onClick={props.reset}
            className="btn btn-default ">
            <i className="fas fa-chevron-circle-right"></i>
            </button>
        </div>
      );
}
  
const Numbers = (props) =>{

  const numberClassName =(number) =>{
    if(props.selectedNumbers.indexOf(number) >= 0)
      return 'selected';
  }
  const Numbers = _.range(1,10);

  return(
    <div className="col-xs-12 col-sm-12 col-md-12 card text-center">
        {Numbers.map((number, i) =>
          <span key={i} className={numberClassName(number)}
          onClick={() => props.selectNumber(number)}>
          {number}</span>
        )}
    </div>
  );
}
  
const Answer = (props) => {
  const answerClassName =(number) =>{
    if(props.correctAnswers.indexOf(number) >= 0)
      return 'btn-success';
    return 'btn-danger';
  }
  return( 
  <div className="answers-section col-xs-12 col-sm-5 col-md-5"> 
          {props.selectedNumbers.map((number, i) =>
            <span key={i} className={answerClassName(number)}>
            {number}</span>
          )}
  </div>
  );
}

const Result = (props) => {
  return(
    <div className="col-12"> 
        <h1>{props.result}</h1>
    </div>
  );
}


  
class Game extends Component {



  state = { selectedNumbers: [], correctAnswers: [], result:'',
  numberOfStars :1+ Math.floor(Math.random() * 9)};


  
  selectNumber = (answer) =>{
    if(this.state.selectedNumbers.indexOf(answer) >= 0)
      return;
    this.setState(prevState =>({
      selectedNumbers: prevState.selectedNumbers.concat(answer)
    }));
    if(answer === this.state.numberOfStars)
      this.state.correctAnswers.push(answer);
    this.setResult();
    this.reset();    
    
  };

  setResult =() =>{
    let total = '';
    console.log(this.state.selectedNumbers.length)
    if(this.state.selectedNumbers.length === 8)
    {
      total = 'Correct answers: ' + this.state.correctAnswers.length
          + '/' + this.state.selectedNumbers.length;
    }
    this.setState(() =>({
      result: total
    }));
  };


  // reset de current number of stars shown
  reset=() =>{
    this.setState(() =>({
      numberOfStars :1+ Math.floor(Math.random() * 9)
    }));
  };

  // restart number of stars, correct answers, and selected numbers
  resetGame =() =>{
    this.reset();
    this.setResult();
    this.setState( () =>({
      correctAnswers :  [],
      selectedNumbers:  []
    }));
  }


render(){
  return(
  
  <div className="container">
    <div className="row">
        <div className="page-header">
            <h2>Play Nine</h2><i className="fas fa-gamepad"></i>
        </div>
    </div>
    <div className="row">
          <div className="container">            
            <div className="row main-section">              
              <Stars  numberOfStars={this.state.numberOfStars}/> 
              <Buttons reset={this.reset} resetGame={this.resetGame} />
              <Answer correctAnswers={this.state.correctAnswers} 
                      selectedNumbers={this.state.selectedNumbers}/>
            </div>
            <hr />
            <div className="row">
            <Numbers selectNumber={this.selectNumber} 
              selectedNumbers={this.state.selectedNumbers}/>
            </div>
            <hr />
            <Result result={this.state.result}/>
        </div>
    </div>
  </div>
    );
  }
}

export default Game;  
