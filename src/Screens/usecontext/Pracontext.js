import React from 'react';

const MyContext = React.createContext();

const MyProvider = ({children}) => {
  const [first1, setfirst1] = React.useState(0);
  const [first2, setfirst2] = React.useState(1);
  const [first3, setfirst3] = React.useState(2);

  return (
    <MyContext.Provider
      value={{first1, setfirst1, first2, setfirst2, first3, setfirst3}}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext, MyProvider};
