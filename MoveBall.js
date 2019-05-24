import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo';

function changeScreenOrientation() {
  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
}

//todo: make the ball expand and contract
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class MoveBall extends React.Component {
	constructor() {
       super();
       this.state = { x: 50,
	                  y: 205,
					  xInc: true,
					  yInc: true,
					  xSpeed: 20,
					  ySpeed: 5,
						grav: 1,
					  diameter: 60,
                      seconds: 0,};
	}

	timerEvent = () => {
		//get the dimensions of the screen
		let deviceWidth = Dimensions.get('window').width;
		let deviceHeight = Dimensions.get('window').height;

		//update the current x coordinates
<<<<<<< HEAD
		let curY = this.state.y;
		let curYDir = this.state.yInc;

		if (curYDir) {
			curY += this.state.ySpeed;
			if (curY > deviceHeight-this.state.diameter-20) {
				curYDir = false;
=======
		let curX = this.state.x;
		let curXDir = this.state.xInc;
		if (curXDir) {

			curX += this.state.xSpeed;
			if (curX > deviceWidth-this.state.diameter-20) {
				curXDir = false;
>>>>>>> 6281fc81c46a7684f2266056a4a52e0751ea2e7d
			}
		}
		else  {
			curY -= this.state.ySpeed;
			if (curY < 0) {
				curYDir = true;
			}
		}

		//update the current y coordinates

		let curX = this.state.x;
		let curXDir = this.state.xInc;
		
		if (curX >= deviceWidth-this.state.diameter) {
			this.state.xSpeed = 0;
		} else if (curXDir) {
			this.state.xSpeed += this.state.grav;
			curX += this.state.xSpeed;
			
			if (curX > deviceWidth-100) {
				this.state.xSpeed *= -1;
				curX:50;
			}
			if (curY < 0) {
				this.state.xSpeed *= -1;
			}
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
	  backgroundColor: 'red',
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
