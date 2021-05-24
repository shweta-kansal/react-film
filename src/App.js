import axios from 'axios';
import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
  s: "",
  results: [],
  selected: {}

  });
  const apiurl = "http://www.omdbapi.com/?apikey=ed5e64e5";
  const search = (e) =>{
    if (e.key ==="Enter"){
      axios(apiurl + "&s=" + state.s).then(({data})=>{
        //console.log(data);
        let results = data.Search;
        setState(prevState =>{
          return { ...prevState, results: results}
        })

      });
    }
  }

  
  const handleInput = (e) =>{
    let s = e.target.value;
    setState(prevState =>{
      return {
        ...prevState, s: s }
    
    });
    //console.log(state.s);
  }
  const openPopup = id =>{
    axios(apiurl + "&i=" + id).then(({data}) =>{
      let result = data;
      console.log(result);

      setState(prevState =>{
        return {...prevState, selected: result }
      });
    });
  }
  const closePopup = () =>{
    setState(prevState =>{
      return{...prevState, selected: {} }
    });
  }
  return (
    <div className="App">
      <header>
        <h1>movie database</h1>
        
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results results={state.results} openPopup={openPopup} />
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup}
        /> : false}
      </main>
    </div>
  );
}
export default App;