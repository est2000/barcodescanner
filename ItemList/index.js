import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

//import styles from './styles';
const basketIcon = require('../assets/basket.png');

export default class UserList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          dataSource: props.datasource,
        };
      }
    
      renderContact = record => {
        return (
            <View style={styles.row}> 
            <View style={styles.iconContainer}> 
              <Image source={basketIcon} style={styles.icon} /> 
            </View> 
            <View style={styles.info}> 
              <Text style={styles.items}>{record.name}</Text> 
              <Text style={styles.address}>{record.items} Adet</Text> 
            </View> 
            <View style={styles.total}> 
              <Text style={styles.price}>{record.price}₺</Text> 
            </View> 
          </View> 
        );
      };
    
    
      render() {
        return (
            <View style={styles.mainContainer}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => this.renderContact(item)}
                style={styles.main}
              />
            </View>
          );         
      }
}

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#fff',
    },
    title: {
      backgroundColor: '#0f1b29',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
      paddingTop: 40,
      textAlign: 'center',
    },
    row: {
      borderColor: '#f1f1f1',
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    },
    iconContainer: {
        alignItems: 'center',
        backgroundColor: '#feb401',
        borderColor: '#feaf12',
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        height: 50,
        width: 50,
      },
      icon: {
        tintColor: '#fff',
        height: 22,
        width: 22,
      },
      iconContainer: {
        alignItems: 'center',
        backgroundColor: '#feb401',
        borderColor: '#feaf12',
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        height: 50,
        width: 50,
      },
      info: { 
        flex: 1, 
        paddingLeft: 25, 
        paddingRight: 25, 
      }, 
      items: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        marginBottom: 5, 
      }, 
      address: { 
        color: '#ccc', 
        fontSize: 14, 
      }, 
      total: { 
        width: 80, 
        justifyContent: 'center',
      }, 
      date: { 
        fontSize: 12, 
        marginBottom: 5, 
      }, 
      price: { 
        color: '#1cad61', 
        fontSize: 25, 
        fontWeight: 'bold', 
      }  
  });