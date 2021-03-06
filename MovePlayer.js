import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native';
import { ScreenOrientation } from 'expo';

//function changeScreenOrientation() {
//  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
//}

//get the dimensions of the screen
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


//todo: make the ball expand and contract
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class MovePlayer extends React.Component {
	constructor() {
       super();
       this.state = { x: 50,
	                  y: 205,
					  xInc: true,
					  yInc: true,
					  xSpeed: 4,
					  ySpeed: 0,
						yAccel: 0.5,
					  diameter: 60,
            time: 0,
          ballCol: 'blue',
          timeFactor:1,
          gameOverText: "",
        };

	}
  
  endGame = () => {
    this.state.ballCol= 'red';
    this.state.xSpeed = 0;
    this.state.ySpeed = 0;
    this.state.timeFactor = 0;
    this.state.yAccel = 0;

    this.state.gameOverText = "Game Over. \n Your score is: " + this.state.time;
  }

  left = () => {
    this.state.xSpeed = 5;
  }

  right = () => {
    this.state.xSpeed = -5;
  }

  jump = () => {
    this.state.ySpeed = -10;
  }

  restart = () => {
    this.state.time = 0;
    this.state.timeFactor = 1;
    this.state.gameOverText = "";
    this.state.y = 205;
    this.state.x = 50;
    this.state.ySpeed = 0;
    this.state.xSpeed = 5;
    this.state.yAccel = 0.5;
    this.state.ballCol = 'blue';
  }

	timerEvent = () => {
    this.state.time += 1*this.state.timeFactor;

    let curX = this.state.x;
    let curXDir = this.state.xInc;

    
    
    if (curX >= deviceWidth-this.state.diameter) {
      this.endGame();
    }else if (curX < 0) {
      this.endGame();
    }else if (curXDir) {
      curX += this.state.xSpeed;

    }else{
        curX -= this.state.xSpeed;
      }

    
    let curY = this.state.y;
    let curYDir = this.state.yInc;

    if (curY >= deviceHeight-this.state.diameter) {
      this.endGame();
    }else if (curY < 0) {
      this.endGame();
    }else if (curYDir) {
      this.state.ySpeed += this.state.yAccel;
      curY += this.state.ySpeed;

    }else{
        curY -= this.state.ySpeed;
    }

    //update state with local variables
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir} );
    };

  componentDidMount() {
    setInterval( this.timerEvent, 20 );
  }

  getTime() {
    if(this.state.timeFactor===1){
      return this.state.time;
    }
    return "";
  }

  ballStyle = function(options) {
     return {
      position: "absolute",
      right: this.state.x,
      top: this.state.y,
      height: this.state.diameter,
	  width: this.state.diameter,
	  borderRadius: this.state.diameter/2,
	  backgroundColor: this.state.ballCol,
     }
 }

   render() {
      return (
	       <View style={styles.container}>

		       <View style={styles.timerView}>

                 <Text style={styles.score}>
                   {this.getTime()}
                 </Text>

                 <Text style = {styles.textCenter}>
                      {this.state.gameOverText}
                  </Text>

               </View>

            <View style={styles.buttonView}>
               <TouchableHighlight style={styles.button} onPress={this.left}>
                 <Text style={styles.buttonText}> L </Text>
               </TouchableHighlight>


               <TouchableHighlight style={styles.button} onPress={this.right}>
                 <Text style={styles.buttonText}> R </Text>
               </TouchableHighlight>

               <TouchableHighlight style={styles.button} onPress={this.jump}>
                 <Text style={styles.buttonText}> ^ </Text>
               </TouchableHighlight>
            </View>

            <View style={styles.buttonView}>
              <TouchableHighlight style={styles.button} onPress={this.restart}>
                <Text style={styles.buttonText}> Restart </Text>
              </TouchableHighlight>
            </View>

		       <View style={this.ballStyle()}>
		       </View>

		     </View>
	  );
  }
}
function round(n) {
  if (!n) {
    return 0;
  }
  return Math.round(n);
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'lightblue',
	  },
  timerView: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 35,
  },
  buttonView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 50,
    textAlign: 'center',
    backgroundColor: 'blue',
  },
  button: {
    flex:1,
    opacity: .5,
  },
  textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
    },
});

export default MovePlayer;
