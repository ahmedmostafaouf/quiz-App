import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Home}></Route>
      <Route
        path='/play/instruction/'
        exact
        component={QuizInstructions}
      ></Route>
      <Route path='/play/' exact component={Play}></Route>
      <Route path='/play/quizSummary' exact component={QuizSummary}></Route>
    </Router>
  );
}

export default App;
