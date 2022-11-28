import React, { useContext, useEffect, useState } from "react";
import HistoricoList from "../../components/HistoricoList";


import { AuthContext } from "../../context/auth";
import {Background, Container,Nome,Saldo, Title, List, Area} from './styles'
import { firebase } from "@react-native-firebase/database";
import { Alert, TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';

export default function Home(){

    const [historico , setHistorico] = useState([]);
    const [saldo , setSaldo] = useState(0)
    
    const {user} = useContext(AuthContext);

    //só vai ter uid se tiver usuario
    const uid = user && user.uid;

    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(
        ()=> {
            async function loadList(){
                await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
                    setSaldo(snapshot.val().saldo);
                    
                });

                await firebase.database().ref('historico')
                .child(uid)
                .orderByChild('date')
                .limitToLast(10)
                .on('value', (snapshot)=>{
                    setHistorico([]);

                    snapshot.forEach((childItem)=>{
                        //comparar a data selecionada com a data da child


                        if(new Date(childItem.val().date).getMonth() === newDate.getMonth() ){
                            if(new Date(childItem.val().date).getDate() === newDate.getDate() ){

                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                            date: childItem.val().date,
                        };

                        setHistorico((oldList)=> [...oldList, list].reverse());
                       }}
                    return
                
                })
                })
            }


        loadList();

        },[newDate]
    );

    function handleDelete (data){
        Alert.alert(
            'Atenção!',
            `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Continuar',
                    onPress: () => handleDeleteSucess(data)
                }
            ]
        )

    };

    async function handleDeleteSucess (data){
        await firebase.database().ref('historico')
        .child(uid).child(data.key).remove()
        .then(async ()=>{
            let saldoAtual = saldo;
            data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual-= parseFloat(data.valor);

            await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual);
        })
        .catch((error)=> {
            console.log(error);
        })



    }

    function handleShowPicker(){
        setShow(true);
      }
    
      function handleClose(){
        setShow(false);
      }
    
      const onChange = (date) => {
        setNewDate(date);
        console.log(date);
        setShow(false)
      } 

    return (
        <Background>
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}</Saldo>
            </Container>

            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <Icon name="event" color="#FFF" size={30}  />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>
            
            <List
            showVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item => item.key}
            renderItem={({item})=> (<HistoricoList data={item} deleteItem={handleDelete}/>)}
            />
            
            {show && (
                <DatePicker
                onClose={handleClose}
                date={newDate}
                onChange={onChange}
                />
            )}
            

        </Background>
    )
}