import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";

const AuthStack = createNativeStackNavigator()

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{headerShown: false}}/>

        <AuthStack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{
                headerStyle:{
                    backgroundColor: '#131313',
                    borderBorromWidth: 1,
                    borderBottomColor: '#00b94a'
                },
                headerTintColor:'#FFF',
                headerBackTitleVisible:false,
                headerTitle: 'Voltar'
            }}
            />
        </AuthStack.Navigator>

        

        
    )
}

export default AuthRoutes;