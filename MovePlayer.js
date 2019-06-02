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
					  xSpeed: 5,
					  ySpeed: 15,
						yAccel: 2,
					  diameter: 60,
            time: 0,
          ballCol: 'blue',
          timeFactor:1,
          gameOverText: "",
        };

	}

  left = () => {
    this.state.xSpeed = 5;
  }

  right = () => {
    this.state.xSpeed = -5;
  }

  jump = () => {
    this.state.ySpeed = -40;
  }

	timerEvent = () => {
    this.state.time += 1*this.state.timeFactor;

    let curX = this.state.x;
    let curXDir = this.state.xInc;
    if (curXDir) {

      curX += this.state.xSpeed;
      if (curX > deviceWidth-this.state.diameter) {
        this.state.ballCol= 'black';
        this.state.xSpeed = 0;
        this.state.ySpeed = 0;
        this.state.timeFactor = 0;
        this.state.gameOverText = "Game Over. \n Your score is: " + this.state.time;
      }
    }
    else {
      curX -= this.state.xSpeed;
      if (curX < 0) {
        this.state.ballCol= 'pink';
        this.state.xSpeed = 0;
        this.state.ySpeed = 0;
        this.state.timeFactor = 0;
        
        this.state.gameOverText = "Game Over. \n Your score is: " + this.state.time;
      }
    }

    let curY = this.state.y;
    let curYDir = this.state.yInc;

    if (curY >= deviceHeight-this.state.diameter) {
      this.state.ballCol= 'yellow';
      this.state.timeFactor = 0;
      curY = deviceHeight-this.state.diameter;
      this.state.xSpeed = 0;
        this.state.ySpeed = 0;
        
        this.state.gameOverText = "Game Over. \n Your score is: " + this.state.time;
    } else if (curYDir) {
      this.state.ySpeed += this.state.yAccel;
      curY += this.state.ySpeed;

    }else{
      if (curY < 0) {
        this.state.ballCol= 'green';
        this.state.xSpeed = 0;
        this.state.ySpeed = 0;
        this.state.timeFactor = 0;
        
        this.state.gameOverText = "Game Over. \n Your score is: " + this.state.time;
      }
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
               <View style={styles.scoreView}>
                 <Text style={styles.score}>
                   {this.getTime()}
                 </Text>
                 <Text style = {styles.textCenter}>
                      {this.state.gameOverText}
                  </Text>
               </View>
               <TouchableHighlight style={styles.buttonView} onPress={this.left}>
                 <Text> L </Text>
               </TouchableHighlight>

               <TouchableHighlight style={styles.buttonView} onPress={this.right}>
                 <Text> R </Text>
               </TouchableHighlight>

                 <TouchableHighlight style={styles.buttonView} onPress={this.jump}>
                   <Text> ^ </Text>
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
  textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
    },
});

export default MovePlayer;
