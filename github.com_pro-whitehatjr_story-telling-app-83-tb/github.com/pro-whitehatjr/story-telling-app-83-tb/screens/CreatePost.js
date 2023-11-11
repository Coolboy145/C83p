import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions } from "react-native";

import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker'
SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
      previewImage: 'image_1',

		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
    }else{
      let preview_images={
        'image_1':require('../assets/story_image_1.png'),
        'image_2':require('../assets/story_image_2.png'),
        'image_3':require('../assets/story_image_3.png'),
        'image_4':require('../assets/story_image_4.png'),
        'image_5':require('../assets/story_image_5.png')
      }
			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Post</Text>
					</View>

				</View>
        <View style={styles.fieldContainer}>
        <ScrollView>
        <Image
        source={preview_images[this.state.previewImage]}
        style={styles.previewImage}></Image>
        <View style={{height:RFValue(this.state.dropdownHeight)}}>
        <DropDownPicker
        items={[
          {label:'image1',value:'image_1'},
          {label:'image2',value:'image_2'},
          {label:'image3',value:'image_3'},
          {label:'image4',value:'image_4'},
          {label:'image5',value:'image_5'},
        ]}
        defaultValue={this.state.previewImage}
        open={this.state.dropdownHeight==170?true:false}
        onOpen={()=>{
          this.setState({dropdownHeight:170})
        }}
        onClose={()=>{
          this.setState({dropdownHeight:40})
        }}
        style={{
          backgroundColor:'transparent',
          borderWidth:1,
          borderColor:'white'
        }}
        textStyle={{
          color:this.state.dropdownHeight==170?'black':white,
          fontFamily:'Bubblegum-Sans',
        }}
        onSelectItem={(item)=>this.setState({
          previewImage:item.defaultValue
        })}/>

        </View>
        </ScrollView>
        </View>
			</View>)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#15193c"
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	},
	appTitle: {
		flex: 0.07,
		flexDirection: "row"
	},
	appIcon: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center"
	},
	iconImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: "center"
	},
	appTitleText: {
		color: "white",
		fontSize: RFValue(28),
		fontFamily: "Bubblegum-Sans"
	}
})