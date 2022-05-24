import { useCallback, useRef, memo, useEffect, useState } from 'react';

import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { Camera as ExpoCamera } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '~/global/theme';

const Camera = memo(() => {
  const CameraRef = useRef<ExpoCamera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type] = useState<'front' | 'back'>(ExpoCamera.Constants.Type.front);
  const [model, setModel] = useState<cocossd.ObjectDetection>();
  const [prevision, setPrevision] = useState<cocossd.DetectedObject[]>();

  useEffect(() => {
    (async () => {
      await tf.ready();
      setModel();

      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onPress = useCallback(async () => {
    const photo = await CameraRef.current?.takePictureAsync();

    const model = await cocossd.load();
    console.log(model);
    if (!photo?.uri || !model) return;

    // const response = await fetch(photo.uri, {}, { isBinary: true})
    // const rawImageData = await response.arrayBuffer();
    // const imageTensor = imageToTensor(rawImageData)
    // const prevision = await model.detect(imageTensor)
    // setPrevision(prevision);
    // console.log(prevision);
  }, []);

  // const imageToTensor = useCallback((rawImageData) => {
  //     const { width, height, data } = jpeg.decode(rawImageData);
  //     // Elimina as informações do canal alfa para COCO-SSD
  //     const buffer = new Uint8Array(width * height * 3)
  //     let offset = 0 // deslocamento para os dados originais
  //     for (let i = 0; i < buffer.length; i += 3) {
  //       buffer[i] = data[offset]
  //       buffer[i + 1] = data[offset + 1]
  //       buffer[i + 2] = data[offset + 2]
  //       offset += 4
  //     }
  //     return tf.tensor3d(buffer, [height, width, 3])
  // }, []);

  //   const onCameraIsReady = useCallback(async (camera) => {
  //     const reatios  = await CameraRef.current?.getSupportedRatiosAsync();
  // console.log('ratiuos', reatios);
  //       const pictureSizes = await CameraRef.current?.getAvailablePictureSizesAsync('16:9');

  //       if(!pictureSizes) return;

  //       let pictureSizeId = 0;

  //       if (Platform.OS === 'ios') {
  //         pictureSizeId = pictureSizes.indexOf('High');
  //       } else {
  //         // returned array is sorted in ascending order - default size is the largest one
  //         pictureSizeId = pictureSizes.length - 1;
  //       }

  //       setPictureSize(pictureSizes[pictureSizeId]);
  //   }, []);

  return !hasPermission ? (
    <View style={styles.containerNotHasPermission}>
      <Text style={styles.textNotHasPermission}></Text>
    </View>
  ) : (
    <ExpoCamera
      ref={CameraRef}
      ratio='16:9'
      style={styles.camera}
      type={type}
      autoFocus={ExpoCamera.Constants.AutoFocus.on}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Print</Text>
      </TouchableOpacity>
    </ExpoCamera>
  );
});
const styles = StyleSheet.create({
  camera: {
    // marginTop: 120,
    flex: 1
  },
  button: {
    flex: 0.1,
    width: '100%',
    height: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.red,
    bottom: 0,
    left: 0
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 16
  },

  containerNotHasPermission: { flex: 1, backgroundColor: 'black' },
  textNotHasPermission: { color: 'white' }
});

export default Camera;
