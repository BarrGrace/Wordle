import { Wordle } from './pages/wordle';
import { Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import { useContext, useState } from 'react';
import { userContex } from './provider/userContex'
import { Header } from './components/Header';
import { Popup } from './components/popUp'
import { popupContext } from './provider/popupContext';
import { UsePopup } from './hooks/usePopup';

function App() {


    let localUser = localStorage.getItem('name') === null ? "guest" : localStorage.getItem('name') + '';

    const [user, setUser] = useState({name: localUser});
    
    if (user.name !== "guest") {

        localStorage.setItem('name', user.name);
    }

    const [pop, setPop] = useState("none");
    
    return(

        <> 
        <userContex.Provider value={{user, setUser}}>
        <popupContext.Provider value = {{pop, setPop}}>
        <Header/>
        <Popup/>
            <Routes>
                <Route path = '/' element = {<Home/>}/>
                <Route path = '/wordle' element = {<Wordle/>}/>
            </Routes>
        </popupContext.Provider>
        </userContex.Provider>
        </>
    )
}

export default App;
