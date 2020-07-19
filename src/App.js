import React, { Component } from 'react';
import Nav from './Components/Nav';
import ArtistList from './Components/ArtistList';
import Artist from './Components/Artist';
import Song from './Components/Song';
import AddSong from './Components/AddSong';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useFirestore, useFirestoreDoc, SuspenseWithPerf } from 'reactfire';



class App extends Component {

  render() {
    return (
      < div className="App" >
        <Router>
          <Nav />
          <Route exact path="/ArtistList/:letter" component={ArtistList} />
          <Route exact path="/Artist/:name" component={Artist} />
          <Route path="/Song/Add" component={AddSong} />
          <Route exact path="/Song/:artist/:title" component={Song} />
        </Router>

      </div >
    )
  }
}

export default App;
