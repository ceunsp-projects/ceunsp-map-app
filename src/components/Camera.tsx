import { useCallback, useRef, memo, useEffect, useState } from 'react';

import { Camera as ExpoCamera, CameraCapturedPicture } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useRequest from '~/hooks/useRequest';
import useLocation from '~/hooks/useLocation';
import placeService from '~/services/place';
import useError from '~/hooks/useError';

const Camera = memo(() => {
  const CameraRef = useRef<ExpoCamera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type] = useState<'front' | 'back'>(ExpoCamera.Constants.Type.back);
  const { onError } = useError();

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      CameraRef.current?.resumePreview();
    })();
  }, []);

  const onPress = async () => {
    try {
      const photo = await CameraRef.current?.takePictureAsync();

      if (!photo?.uri) return;

      const response = await placeService.create(photo, location);
      console.log('AQUIIII', response);
    } catch (error: any) {
      onError(error);
    }
  };

  return !hasPermission ? (
    <View style={styles.containerNotHasPermission}>
      <Text style={styles.textNotHasPermission}>Precisamos de sua permissão para acessar a camera :(</Text>
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
        <Text style={{ color: 'white' }}>Tire uma foto do seu bloco</Text>
      </TouchableOpacity>
    </ExpoCamera>
  );
});

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  containerNotHasPermission: { flex: 1, backgroundColor: 'black' },
  textNotHasPermission: { color: 'white' }
});

export default Camera;
