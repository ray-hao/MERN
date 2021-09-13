import TodoPage from './Pages/TodoPage';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom';
import ShowPage from './Pages/ShowPage';

const App = () => {
  return (
    <Router>
      <Switch>

        <Route exact path='/'>
          <TodoPage />
        </Route>
 
        <Route path='/:id'>
          <ShowPage />
        </Route>

      </Switch>
    </Router>
  
  );
}

export default App;
