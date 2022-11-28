import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";



import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";
import CustomDrawer from '../components/CustomDrawer'

const AppDrawer = createDrawerNavigator();

function AppRoutes(){


    return(
        <AppDrawer.Navigator 
        drawerContent={(props)=> <CustomDrawer {...props}/>}
        screenOptions={{
            drawerStyle: {
              backgroundColor: '#171717'
            },
            
            drawerLabelStyle:{
                fontWeight:'bold'
            },
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#000',
            },
            headerTitle: "",
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'#00b94a',
            drawerInactiveTintColor:'#fff',
            drawerInactiveBackgroundColor:'#000',
            drawerItemStyle:{
                marginVertical: 5,
            },
            
            }}>

                <AppDrawer.Screen name="Home" component={Home}/>
                <AppDrawer.Screen name="Registrar" component={New}/>
                <AppDrawer.Screen name="Perfil" component={Profile}/>
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;