import React from "react";
import { Animated, Pressable } from "react-native";

class ButtonAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(1)
    };
  }

  onPressIn = () => {
    Animated.timing(this.state.scaleValue, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true
    }).start();
    this.props.onPressIn && this.props.onPressIn();
  };

  onPressOut = () => {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start();
    this.props.onPressOut && this.props.onPressOut();
  };

  render() {
    const { scaleValue } = this.state;
    const animatedStyle = {
      transform: [{ scale: scaleValue }]
    };

    // Supprimer le style des props pour éviter l'application double
    const { style, ...otherProps } = this.props;

    return (
      <Pressable
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        {...otherProps}
      >
        {({ pressed }) => (
          <Animated.View style={[animatedStyle, style]}>
            {this.props.children}
          </Animated.View>
        )}
      </Pressable>
    );
  }
}

export default ButtonAnimation;
