import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import question from '../../question.json';
import isEmpty from '../../utools/is-empty';
import M from 'materialize-css';
import classnames from '../../../node_modules/classname/classname.js';

import CorrectNotification from '../../assets/audio/correct-answer.mp3';
import WrongNotification from '../../assets/audio/wrong-answer.mp3';
import ButtonNotification from '../../assets/audio/button-sound.mp3';
class Play extends Component {
  state = {
    question,
    currentQuestion: {},
    nextQuestion: {},
    previousQuestion: {},
    answer: '',
    numberOfQuestion: 0,
    number: 0,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
    hinsts: 5,
    fiftyFifty: 2,
    usedFiftyFifty: false,
    time: {},
    previousRandomNumber: [],
    nextButtonDisabled: false,
    previousButtonDisabled: true,
  };

  displayQuestion = (
    question = this.state.question,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(question)) {
      currentQuestion = question[currentQuestionIndex];
      nextQuestion = question[currentQuestionIndex + 1];
      previousQuestion = question[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          question,
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestion: question.length,
          answer,
          previousRandomNumber: [],
        },
        () => {
          this.showOption();
          this.handleButtonDisabled();
        }
      );
    }
  };
  componentDidMount() {
    let {
      question,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestion(
      question,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.setTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  clickOption = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 500);
      this.correctAnswers();
    } else {
      setTimeout(() => {
        document.getElementById('wrong-sound').play();
      }, 500);
      this.wrongAnswers();
    }
  };

  // click Button to nextquestion
  clickNextButtonQuestion = () => {
    if (this.state.nextQuestion !== undefined) {
      this.playButtonSound();
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestion(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  // click Button to previousQuestion
  clickPreviousButtonQuestion = () => {
    if (this.state.previousQuestion !== undefined) {
      this.playButtonSound();
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestion(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  // click Button to QuitPlay
  clickQuitButtonQuestion = () => {
    if (window.confirm('Are You Sure You Want to Quit ? ')) {
      this.playButtonSound();
      this.props.history.push('/');
    }
  };
  clickButton = (e) => {
    switch (e.target.id) {
      case 'next-button':
        this.clickNextButtonQuestion();
        break;
      case 'previos-button':
        this.clickPreviousButtonQuestion();
        break;
      case 'quit-button':
        this.clickQuitButtonQuestion();
        break;

      default:
        break;
    }
  };
  playButtonSound = () => {
    document.getElementById('button-sound').play();
  };

  // Correct Answer
  correctAnswers = () => {
    M.toast({
      html: 'Correct Answer!',
      classes: 'valid-answer',
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswer: prevState.correctAnswer + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        number: prevState.number + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestion(
            this.state.question,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };
  wrongAnswers = () => {
    navigator.vibrate(1000);
    M.toast({
      html: 'Wrong Answer!',
      classes: 'invalid-answer',
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswer: prevState.wrongAnswer + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        number: prevState.number + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestion(
            this.state.question,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  // handel hints
  handelClickHints = (e) => {
    // hints >0
    if (this.state.hinsts > 0) {
      // make oprions in array
      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;
      // forloop to options
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() ===
          this.state.answer.toLocaleLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          indexOfAnswer !== randomNumber &&
          !this.state.previousRandomNumber.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = 'hidden';
              this.setState((prevState) => ({
                hinsts: prevState.hinsts - 1,
                previousRandomNumber: prevState.previousRandomNumber.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        // break hints where hints = 3 beacause i have 4 option
        if (this.state.previousRandomNumber.length >= 3) break;
      }
    }
  };
  // function run when use hints and show another class
  showOption = () => {
    const options = Array.from(document.querySelectorAll('.option'));
    options.forEach((option) => {
      option.style.visibility = 'visible';
    });
  };
  // timer
  setTimer = () => {
    const countDownTime = Date.now() + 20000 * 60;
    this.interval = setInterval(() => {
      const now = new Date();
      const dinstance = countDownTime - now;
      const minutes = Math.floor((dinstance % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((dinstance % (1000 * 60)) / 1000);
      if (dinstance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              second: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            second,
          },
        });
      }
    }, 1000);
  };

  handleButtonDisabled = () => {
    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestion
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }
  };
  endGame = () => {
    const { state } = this;
    const endState = {
      score: state.score,
      correctAnswer: state.correctAnswer,
      wrongAnswer: state.wrongAnswer,
      numberOfQuestion: state.numberOfQuestion,
      numberOfAnswerQuestion: state.correctAnswer + state.wrongAnswer,
      usedFiftyFifty: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hinsts,
    };
    console.log(endState);
    setTimeout(() => {
      alert('Quiz Ended');
      this.props.history.push('/play/quizSummary', endState);
    }, 1000);
  };

  render() {
    const {
      currentQuestion,
      numberOfQuestion,
      currentQuestionIndex,
      hinsts,
      fiftyFifty,
      time,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Quiz App - Play</title>
        </Helmet>
        <Fragment>
          <audio id='correct-sound' src={CorrectNotification}></audio>
          <audio id='wrong-sound' src={WrongNotification}></audio>
          <audio id='button-sound' src={ButtonNotification}></audio>
        </Fragment>
        <div className='question'>
          <h2> Quiz Mode</h2>
          <div className='lifeline-container'>
            <p>
              <span
                onClick={this.handelClickHints}
                className='mdi mdi-set-center mdi-24px lifeline-icon'
              ></span>
              <span className='lifeline'> {fiftyFifty}</span>
            </p>
            <p>
              <span
                onClick={this.handelClickHints}
                className='mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon'
              ></span>
              <span className='lifeline'> {hinsts}</span>
            </p>
          </div>
          <div className='timer-container'>
            <p>
              <span className='left'>
                {currentQuestionIndex + 1} of {numberOfQuestion}
              </span>
              <span className='right lifeline'>
                {time.minutes}:{time.second}
                <span className='mdi mdi-clock-outline mdi-24px lifeline-icon'></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className='options-container'>
            <p onClick={this.clickOption} className='option'>
              {currentQuestion.optionA}
            </p>
            <p onClick={this.clickOption} className='option'>
              {currentQuestion.optionB}
            </p>
          </div>
          <div className='options-container'>
            <p onClick={this.clickOption} className='option'>
              {currentQuestion.optionC}
            </p>
            <p onClick={this.clickOption} className='option'>
              {currentQuestion.optionD}
            </p>
          </div>
          <div className='button-container'>
            <button
              className={classnames('', {
                disable: this.state.previousButtonDisabled,
              })}
              id='previos-button'
              onClick={this.clickButton}
            >
              Previous
            </button>
            <button
              className={classnames('', {
                disable: this.state.nextButtonDisabled,
              })}
              id='next-button'
              onClick={this.clickButton}
            >
              Next
            </button>
            <button
              id='quit-button'
              onClick={this.clickButton}
              className='quit'
            >
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Play;
