import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
class QuizSummary extends Component {
  state = {
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
    numberOfQuestion: 0,
    numberOfAnswerQuestion: 0,
    hintsUsed: 0,
    usedFiftyFifty: 0,
  };
  componentDidMount() {
    const { state } = this.props.location;
    this.setState({
      score: (state.score / state.numberOfQuestion) * 100,
      correctAnswer: state.correctAnswer,
      wrongAnswer: state.wrongAnswer,
      numberOfQuestion: state.numberOfQuestion,
      numberOfAnswerQuestion: state.numberOfAnswerQuestion,
      hintsUsed: state.hintsUsed,
      usedFiftyFifty: state.usedFiftyFifty,
    });
  }
  render() {
    const { state } = this.props.location;
    const userScore = this.state.score;
    console.log(userScore);
    let stats, remark;
    if (userScore <= 30) {
      remark = 'خول';
    } else if (userScore > 30 && userScore < 50) {
      remark = ' نص خول';
    } else if (userScore <= 70 && userScore > 50) {
      remark = ' جدع';
    } else if (userScore >= 71 && userScore < 84) {
      remark = ' ممتاز';
    } else {
      remark = 'ممتاز جدا';
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: 'center' }}>
            <span className='mdi mdi-check-circle-outline success-icon'></span>
          </div>
          <h1>Quiz has ended</h1>
          <div className='container stats'>
            <h4>{remark}</h4>
            <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
            <span className='stat left'>Total number of questions: </span>
            <span className='right'>{this.state.numberOfQuestion}</span>
            <br />
            <span className='stat left'>Number of attempted questions: </span>
            <span className='right'>{this.state.numberOfAnswerQuestion}</span>
            <br />
            <span className='stat left'>Number of Correct Answers: </span>
            <span className='right'>{this.state.correctAnswer}</span> <br />
            <span className='stat left'>Number of Wrong Answers: </span>
            <span className='right'>{this.state.wrongAnswer}</span>
            <br />
            <span className='stat left'>Hints Used: </span>
            <span className='right'>{this.state.hintsUsed}</span>
            <br />
            <span className='stat left'>50-50 Used: </span>
            <span className='right'>{this.state.usedFiftyFifty}</span>
          </div>
          <section>
            <ul>
              <li>
                <Link to='/play'>Play Again</Link>
              </li>
              <li>
                <Link to='/'>Back to Home</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <section>
          <h1 className='no-stats'>No Statistics Available</h1>
          <ul>
            <li>
              <Link to='/play/quiz'>Take a Quiz</Link>
            </li>
            <li>
              <Link to='/'>Back to Home</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>Quiz App - Summary</title>
        </Helmet>
        <div className='quiz-summary'>{stats}</div>
      </Fragment>
    );
  }
}
export default QuizSummary;
