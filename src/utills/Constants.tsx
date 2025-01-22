import { Dimensions, Appearance } from "react-native";

// Get the system's color scheme
const colorScheme = Appearance.getColorScheme();

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

// Define colors for light and dark modes
const lightColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  theme: '#CF551F',
  secondary: '#E5EBF5',
  tertiary: '#3C75BE',
  secondary_light: '#F6F7F9',
  icon: '#A8C6FB',
};

const darkColors = {
  primary: '#007AFF',
  background: '#202124',
  text: '#FFFFFF',
  theme: '#CF551F',
  secondary: '#3C3F43',
  tertiary: '#3C75BE',
  secondary_light: '#2A2A2E',
  icon: '#4A6EA9',
};

// Export the current theme's colors
export const Colors = colorScheme === 'dark' ? darkColors : lightColors;