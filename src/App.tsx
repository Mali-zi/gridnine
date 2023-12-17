import './App.css';
import SideBar from './components/SideBar';
import Main from './components/Main';

function App() {
  return (
    <div className="d-flex flex-row">
      <SideBar />
      <Main />
    </div>
  );
}

export default App;
