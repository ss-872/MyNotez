import {useEffect,useState} from "react";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import MyNotes from "./Components/MyNotes/MyNotes";
import SingleNote from "./Components/SingleNote/SingleNote"
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import LandingPage from "./Components/LandingPage/LandingPage";
import CreateNote from "./Components/createNote/CreateNote";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer"
import ProfileScreeen from "./Components/Profile/ProfileScreen"


function App() {
  const [search,setSearch]=useState("")
  return (
    <div>
       <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage/>} exact/>
            <Route path='/notes' element={ <MyNotes/>} />
            {/* <Route path='/profile' element={ <ProfileScreeen/>} /> */}
            <Route path='/note/:id' element={<SingleNote />} />
             <Route path='/register' element={<RegisterScreen />} />
             <Route path='/login' element={<LoginScreen />} />
             <Route path='/createnote' element={<CreateNote />} />
  
          </Routes>
       <Footer />
      </BrowserRouter>
    </div>
  );
}
  
export default App;
