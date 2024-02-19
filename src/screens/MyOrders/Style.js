import { StyleSheet } from 'react-native';
import { alignment } from '../../../Utils/alignement';
import { scale, verticalScale } from '../../../Utils/scaling';

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const useStyle = () => {
  const backgroundColor = randomColor();
  const buttonColor = randomColor();
  const cardBackgroundColor = randomColor();
  const buttonBackgroundColor = randomColor();
  const borderColor = randomColor();
  const shadowColor = randomColor();
  const loadingBackgroundColor = randomColor();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    safeAreaViewStyles: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      ...alignment.PBsmall,
    },
    subContainerImage: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      ...alignment.PBlarge,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MBlarge,
    },
    image: {
      width: scale(134),
      height: scale(131),
    },
    descriptionEmpty: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.Plarge,
    },
    emptyButton: {
      width: '70%',
      height: scale(50),
      backgroundColor: buttonColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: scale(15),
      ...alignment.MTlarge,
    },
    subContainer: {
      flex: 1,
      backgroundColor: cardBackgroundColor,
      borderRadius: scale(20),
      elevation: 3,
      width: '85%',
      alignSelf: 'center',
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: verticalScale(1),
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...alignment.Psmall,
      ...alignment.MBmedium,
    },
    subContainerLeft: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.PRxSmall,
      ...alignment.PLxSmall,
    },
    subContainerRight: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subContainerButton: {
      backgroundColor: buttonBackgroundColor,
      width: scale(70),
      height: verticalScale(25),
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Vline: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: borderColor,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowRadius: 10,
      shadowColor: shadowColor,
      shadowOpacity: 0.6,
    },
    imgContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      overflow: 'hidden',
    },
    imgResponsive: {
      width: scale(70),
      height: scale(70),
    },
    loadingView: {
      backgroundColor: loadingBackgroundColor,
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
      ...alignment.PRxSmall,
      ...alignment.PLsmall,
    },
  });
};

export default useStyle;
