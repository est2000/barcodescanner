import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Dimensions,Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ItemList from './ItemList'
import { unmountComponentAtNode } from 'react-dom';



const { width, height } = Dimensions.get("window");
const billIcon = require('./assets/bill.png');

import products from './products.json';
import data from './sales.json';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [listDataSource, setData] = useState([]);
  const [sumOfProducts, setCount] = useState(0);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setData(data);
      getSum();
    })();
   
  }, []);

  const getSum = () =>{
    var totalBill = 0;
    for (let index = 0; index < listDataSource.length; index++) {
      const element = listDataSource[index];
      totalBill += element.price * element.items;
    }

    setCount(totalBill);
  };

  getItem = (id) => {
    var item = null;
    products.filter(product => product.barcode_id == id).map(filteredProduct => (
      item = filteredProduct
    ));
    return item;
  }; 

  ifExistItem = (id) => {
    var isExist = false;
    listDataSource.filter(product => product.barcode_id == id).map(filteredProduct => (
      filteredProduct.items += 1,
      isExist = true
    ));
    return isExist;
  }; 

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);

    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    let item = getItem(data);
    if(item != null){
       
      if(!ifExistItem(data)){

        let barcode = {
          "items": 1,
          "name": item.name,
          "price": item.price,
          "barcode_id":data
        };

        listDataSource.push(barcode);

      } 
      
      setData(listDataSource);
      getSum();

    }
    

   
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View styles={styles.container}>
      <View style={styles.camera}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.tabbutton}>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View style={styles.userlist}>
        <ItemList datasource={data}></ItemList>
      </View>
      <View style={styles.part}>
            <View style={styles.iconContainer}> 
              <Image source={billIcon} style={styles.icon} /> 
            </View> 
            <View style={styles.info}> 
              <Text style={styles.header}>Total</Text> 
            </View> 
            <View style={styles.total}> 
              <Text style={styles.price}>${sumOfProducts}</Text> 
            </View> 
          </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera : {
    height:200,
    marginTop:20,
    width:width - 40,
    margin:20,
  },
  userlist:{
    flexGrow:2,
    overflow:"visible",
    height:300,
  },
  part: {
    borderColor: '#f1f1f1',
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
  },
  title: {
    color: '#FD909E',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
    margin:10
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
  price: { 
    color: '#1cad61', 
    fontSize: 25, 
    fontWeight: 'bold', 
  } ,
  total: { 
    width:80,
    justifyContent: 'center',
  },
  info: { 
    flex: 1, 
    paddingLeft: 25, 
    paddingRight: 25, 
    justifyContent: 'center',
  }, 
  header : {
    fontWeight: 'bold', 
        fontSize: 16, 
        marginBottom: 5, 
  },
  tabbutton:{
height:30
  },
});
