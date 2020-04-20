import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Entry from './Entry';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Graff from './Graff';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path='/' component={Entry} />
        <Route path='/room/create/' component={CreateRoom} />
        <Route path='/room/join/' component={JoinRoom} />
        <Route path='/room/:roomId/' component={Graff} />
      </BrowserRouter>
    </>
  );
};

export default App;
