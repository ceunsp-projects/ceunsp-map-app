import { useRef, memo, useEffect, useState } from 'react';

import { Camera as ExpoCamera } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera as Cam } from 'phosphor-react-native';
import theme from '~/global/theme';
import useLocation from '~/hooks/useLocation';
import placeService from '~/services/place';
import useError from '~/hooks/useError';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Camera = memo(() => {
  const CameraRef = useRef<ExpoCamera>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
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

      navigation.navigate('Map', { place: response.data.place });
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.message;
      console.log(JSON.stringify(error));
      onError(message);
    }
  };

  return !hasPermission ? (
    <View style={styles.containerNotHasPermission}>
      <Text style={styles.textNotHasPermission}>Precisamos de sua permissão para acessar a camera :(</Text>
    </View>
  ) : isFocused ? (
    <ExpoCamera
      ref={CameraRef}
      ratio='16:9'
      style={styles.camera}
      type={type}
      autoFocus={ExpoCamera.Constants.AutoFocus.on}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Cam size={32} color='#fff' />
      </TouchableOpacity>
    </ExpoCamera>
  ) : (
    <View />
  );
});

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.navy_blue,
    marginBottom: 10
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
