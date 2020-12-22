import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';

function App() {
  return (
    <Router>
      <Link to='/play'> ahmed </Link>
      <Route path='/' exact component={Home}></Route>
      <Route path='/ ' exact component={QuizInstructions}></Route>
      <Route path='/play/' exact component={Play}></Route>
      <Route path='/play/quizSummary' exact component={QuizSummary}></Route>
    </Router>
  );
}

export default App;
