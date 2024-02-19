import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArViewerView } from 'react-native-ar-viewer';

const ARScene = ({ route }) => {
  const { glbUrl } = route.params;

  return (
    <View style={styles.container}>
      <ArViewerView
        style={{ flex: 1 }}
        model={glbUrl}
        lightEstimation
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => console.log('AR session started')}
        onEnded={() => console.log('AR session ended')}
        onModelPlaced={() => console.log('Model displayed')}
        onModelRemoved={() => console.log('Model not visible anymore')}
        planeOrientation="both"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ARScene;
