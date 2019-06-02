import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

//Expo.ScreenOrientation.allow(Expo.ScreenOrientation.LANDSCAPE_RIGHT);

//todo: make the ball expand and contract
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class MoveBall extends React.Component {
	constructor() {
       super();
       this.state = { x: 50,
	                  y: 205,
					  xInc: true,
					  yInc: false,
					  xSpeed: 50,
					  ySpeed: 15,
						yAccel: 2,
					  diameter: 60,
                      seconds: 0,
										xAccel: 0,
                  ballCol: 'red'};
	}

	timerEvent = () => {
		//get the dimensions of the screen
		let deviceWidth = Dimensions.get('window').width;
		let deviceHeight = Dimensions.get('window').height;

		//update the current x coordinates
		let curX = this.state.x;
		let curXDir = this.state.xInc;
		if (curXDir) {
			
			curX += this.state.xSpeed;
			if (curX > deviceWidth-this.state.diameter) {
        this.state.ballCol= 'black';
				curXDir = false;
			}
		}
		else {
			curX -= this.state.xSpeed;
			if (curX < 0) {
        this.state.ballCol= 'pink';
				curXDir = true;
			}
		}

    let curY = this.state.y;
		let curYDir = this.state.yInc;
    
		if (curY >= deviceHeight-this.state.diameter) {
			this.state.ballCol= 'yellow';
			curY = deviceHeight-this.state.diameter;
      curYDir = false;
		} else if (curYDir) {
			this.state.ySpeed += this.state.yAccel;
			curY += this.state.ySpeed;
			
		}else{
      if (curY < 0) {
				this.state.ballCol= 'green';
        curYDir = true;
			}
      	curY -= this.state.ySpeed;
    }
	
		//update state with local variables
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir} );
    };

  componentDidMount() {
    setInterval( this.timerEvent, 20 );
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
             <Text style = {styles.textCenter}>
                  x: {round(this.state.x)} y: {round(this.state.y)}
              </Text>
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
    },
});

export default MoveBall;
