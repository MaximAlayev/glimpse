import React, {useState, createContext} from 'react';

const initialState = {
  JWT: null,
  setJWT: null,
  clientId: null,
  setClientID: null,
  palette: null,
  setPalette: null,
  isDarkMode: null,
  setIsDarkMode: null,
};

export const Context = createContext(initialState);

const Provider = ({children}) => {
  const lightModePalette = {
    BG: '#FBFBFB',
    MG: '#ECECEC',
    FG: '#DDDDDD',
    XFG: '#C0C0C0',
    Accent: '#E2C275',
    MainText: '#000000',
    BlackText: '#000000',
    WhiteText: '#FFFFFF',
  };

  const darkModePalette = {
    BG: '#373B41',
    MG: '#474B52',
    FG: '#535962',
    XFG: '#717A87',
    Accent: '#BBA162',
    MainText: '#FFFFFF',
    BlackText: '#000000',
  };

  const [JWT, setJWT] = useState('');
  const [clientID, setClientID] = useState(null);
  const [palette, setPalette] = useState(lightModePalette);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setPalette(lightModePalette);
    } else {
      setPalette(darkModePalette);
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Context.Provider
      value={{
        JWT,
        setJWT,
        clientID,
        setClientID,
        palette,
        isDarkMode,
        toggleDarkMode,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
