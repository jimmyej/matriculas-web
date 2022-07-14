import { Provider } from 'react-redux';
import './App.css';
import Students from './components/Students';
import store from './core/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Students/>
      </div>
    </Provider>
  );
}

export default App;
