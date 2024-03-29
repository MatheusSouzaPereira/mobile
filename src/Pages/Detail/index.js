import React from 'react';
import {View , TouchableOpacity,Image ,Text , Linking} from 'react-native' ;
import {Feather} from '@expo/vector-icons';
import {useNavigation , useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';



export default function Detail (){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident ;
    
    const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de estar ajudando no caso da "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{style :'currency',currency :'BRL'}).format(incident.value)}"`;
  
   

    function navigateBack(){
        navigation.goBack()
    }
    function sendMail (){
        MailComposer.composeAsync({
            subject :` Heroi do caso : ${incident.title}` ,
            recipients :[incident.email],
            body :message,
        })
    }
    function senWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.Whatsapp}&text= ${message}`);
    }


    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source = {logoImg}/>

            <TouchableOpacity onPress = {navigateBack}>
                <Feather name="arrow-left" size ={28} color = "#E82041" />
            </TouchableOpacity>
          </View>
          <View style={styles.incident}>
                <Text style = {styles.incidentProperty}>ONG:</Text>
                <Text style = {styles.incidentValue}>{incident.name}</Text>
  
                <Text style = {styles.incidentProperty}>CASO:</Text>
                <Text style = {styles.incidentValue}>{incident.title}</Text>
  
                <Text style = {styles.incidentProperty}>Valor:</Text>
                <Text style = {styles.incidentValue}>
                {Intl.NumberFormat('pt-BR',{style :'currency',currency :'BRL'}).format(incident.value)}</Text>
            
            </View>
          
          <View style = {styles.contactBox}>
              <Text style = {styles.heroTitle}>Salve o dia !</Text>
              <Text style = {styles.heroTitle}>Seja o Heroi desse caso !</Text>

              <Text style ={styles.heroDescription}>Entre em contato :</Text>
              <View style = {styles.actions}>
                  <TouchableOpacity style={styles.action} onPress = {senWhatsapp}>
                      <Text style = {styles.actionText}>WhatsAPP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress = {sendMail}>
                      <Text style = {styles.actionText}>E-mail</Text>
                  </TouchableOpacity>
              </View>
          </View>
          </View>
    );
}