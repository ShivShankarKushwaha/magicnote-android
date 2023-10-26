import React, { useEffect, useState } from 'react'
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUp from './Components/SignUp';
import axios from './axios';
import Profile from './Components/Profile';
import NoteScreen from './Components/Notes';
import ResetPassword from './Components/ResetPassword';
import About from './Components/About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
const Drawer =createDrawerNavigator();
const App = () => {
  const [loggedin, setloggedin] = useState(false);
  if (typeof drawerLabel === "function" && drawerLabel() === null) return null;
  // useEffect(() =>
  // {
  //   axios.post("/user")
  //     .then(result => { setloggedin(true) })
  //     .catch(err =>
  //     {
  //       setloggedin(false);
  //     })
  // },[])
  useEffect(() =>
  {
    SplashScreen.hide();
    const fetchData = async () =>
    {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const result = await axios.post('/user', { token }); // Include the token in the request body
          setloggedin(true);
        } else {
          await AsyncStorage.removeItem('token');
          // Handle the case where there is no token in AsyncStorage
          setloggedin(false);
        }
      } catch (err) {
        console.error('Error in axios request', err);
        setloggedin(false);
      }
    };

    fetchData();
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen options={{ headerShown: '' }} name="Home">{(props) => <Homepage {...props} loggedin={loggedin} />}</Drawer.Screen>
        <Drawer.Screen options={{ headerShown: '' }} name="About">{(props) => <About {...props} />}</Drawer.Screen>
        {/* <Drawer.Screen options={{headerShown:''}} name='Home' component={Homepage}></Drawer.Screen> */}
        {!loggedin &&<Drawer.Screen options={{ headerShown: '' }} name="Login">{(props) => <Login {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {/* <Drawer.Screen options={{ headerShown: '' }} name='Login' component={Login}></Drawer.Screen> */}
        {/* <Drawer.Screen options={{ headerShown: '',drawerItemStyle:{display:'none'}}} name='SignUp' component={SignUp}></Drawer.Screen> */}
        {!loggedin && <Drawer.Screen options={{ headerShown: '', drawerItemStyle: { display: 'none' } }} name="SignUp">{(props) => <SignUp {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {/* {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Profile">{(props) => <Profile {...props} setLoggedin={setloggedin} />}</Drawer.Screen>} */}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Profile">{(props) => <Profile {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {loggedin && <Drawer.Screen options={{ headerShown: '', drawerItemStyle: { display: 'none' } }} name="ResetPassword">{(props) => <ResetPassword {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        <Drawer.Screen options={{ headerShown: '' }} name="Notes">{(props) => <NoteScreen {...props} loggedin={loggedin} setLoggedin={setloggedin} />}</Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;
