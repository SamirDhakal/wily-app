import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config.js';

export default class BookTransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedbookID : '',
            scannedstudentID : '',
            buttonState : 'normal'
        }
    }
    
    getCameraPermissions = async(id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions : status === "granted",
            buttonState : id,
            scanned : false
        })
    }
    handleTransaction = () => {
        var transactionMessege = db.collection("books").doc(this.state.scannedbookID).get().then((doc) => {
            console.log(doc.data)
        })
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState !== 'normal' && hasCameraPermissions) {
            return(
                <View style = {styles.container}>
                    <Text style = {styles.displayText}>{hasCameraPermissions === true? this.state.scannedData : "request camera permissions"}</Text>
                    <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions}>
                        <Text style = {styles.displayText}>Scan QR Code</Text>
                    </TouchableOpacity>
                    
                </View>
            )
        } 
        else if(buttonState === 'normal') {
            return(
                <View style = {styles.container}>
                    <View>
                        <Image source = {require("../assets/booklogo.jpg")} style = {{width : 200, height : 200}}/>
                        <Text style = {{textAlign : 'center', fontSize : 30}}>Wily</Text>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput style = {styles.inputBox} placeholder = "bookid" value = {this.state.scannedbookID}/>
                        <TouchableOpacity style = {styles.scanButton} onPress = {() => {
                            this.getCameraPermissions("bookid")
                        }}>
                            <Text style = {styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput style = {styles.inputBox} placeholder = "studentid" value = {this.state.scannedstudentID}/>
                        <TouchableOpacity style = {styles.scanButton} onPress = {() => {
                            this.getCameraPermissions("studentid")
                        }}>
                            <Text style = {styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style = {styles.submitButton} onPress = {this.handleTransaction}>
                        <Text style = {styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    displayText:{
        fontSize : 15
    },
    scanButton:{
        backgroundColor : '#2196F3',
        padding : 10,
        margin : 10
    },
    buttonText:{
        fontSize : 15,
        textAlign : 'center',
        marginTop : 10
    },
    inputView:{
        flexDirection : 'row',
        margin : 20
    },
    inputBox:{
        width : 200,
        height : 40,
        borderWidth : 1.5,
        borderRightWidth : 0,
        fontSize : 20
    },
    submitButton:{
        backgroundColor : '#FBC02D',
        width : 100,
        height : 50
    },
    submitButtonText:{
        padding : 10,
        textAlign : 'center',
        fontSize : 20,
        fontWeight : "bold",
        color : 'white'
    }
})