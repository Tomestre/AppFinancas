import React, {createContext, useState} from "react";
import database from "@react-native-firebase/database";
import  auth  from "@react-native-firebase/auth";


export const AuthContext = createContext({});

function AuthProvider ({children}){
    const [user, setUser] = useState(null);

    //Cadastrar Usuarios
    async function signUp (email,password,nome) {
         
        auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=> {
            let uid = value.user.uid;
            console.log(uid)
            
            await database().ref('users').child(uid).set({
                saldo:0,
                nome: nome
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                };
                console.log(data)

                setUser(data);
            }).catch(error => console.log(error.code))
        }
        )
    }



    return(
        <AuthContext.Provider value={{signed: !!user , user, signUp}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider; 