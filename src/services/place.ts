import { CameraCapturedPicture } from 'expo-camera';
import apiService from './api';
import { LocationObject } from 'expo-location';

class PlaceService {
  async create(photo: CameraCapturedPicture, location?: LocationObject) {
    const data = new FormData();

    data.append('place', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'teste.jpeg'
    } as any);
    data.append('latitude', location?.coords.latitude as any);
    data.append('longitute', location?.coords.longitude as any);

    console.log('/place/save', data);

    return apiService.post('/place/save', data);
  }
}

const placeService = new PlaceService();
export default placeService;
