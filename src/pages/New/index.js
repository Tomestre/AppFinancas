import React, {useContext, useState} from "react";
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import Picker from "../../components/Picker";
import {Background, Input, SubmitButton, SubmitText} from './styles'
import { database, firebase } from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";

export default function New(){
    
    const navigation = useNavigation();
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

    const {user: usuario} = useContext(AuthContext);

    function handleSubmit (){
        Keyboard.dismiss();

        if(isNaN(parseFloat(valor)) || tipo === null){

            alert('Preencha todos os campos');
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd(){
        let uid = usuario.uid

        let key = await firebase.database().ref('historico').child(uid).push().key;

        let now = Date.now()

        firebase.database().ref('historico').child(uid).child(key).set({
            tipo: tipo,
            valor: parseFloat(valor),
            date: now,
        })

        //atualizar valor no firebase
        let user = firebase.database().ref('users').child(uid);
        await user.once('value').then((snapshot)=>{

            let saldo = parseFloat(snapshot.val().saldo);

            tipo === 'despesa' ? saldo-= parseFloat(valor) : saldo += parseFloat(valor);

            user.child('saldo').set(saldo);
        });
        setValor('');
        Keyboard.dismiss();
        navigation.navigate('Home');


        
    }



    return(

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }> 
        <Background>

            <SafeAreaView style={{alignItems: 'center'}}>
                <Input
                placeholder='Valor desejado'
                keyboardType='numeric'
                returnKeyType='next'
                onSubmitEditing={()=> Keyboard.dismiss()}
                value={valor}
                onChangeText={(text) => setValor(text)}
                />

            
            <Picker onChange={setTipo} tipo={tipo}/>


            <SubmitButton onPress={()=> handleSubmit()}>

                <SubmitText> Registrar </SubmitText>

            </SubmitButton>

            </SafeAreaView>

        </Background>
        </TouchableWithoutFeedback>
    )
}