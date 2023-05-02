import React, { useState } from 'react';
import Index from './Components/Index';
import FirebaseProvider from './Context/FirebaseContext';
function App() {

  return (
    <FirebaseProvider>
      <div>
        <Index />
      </div>
    </FirebaseProvider>

  );
}

export default App;
