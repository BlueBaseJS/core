
import ReactDOM from 'react-dom';

const setMainView=(App)=>{
    ReactDOM.render(<App />, document.getElementsByClassName('app-container')[0]);
    
}

export default  setMainView;