import { CameraCapturedPicture } from 'expo-camera';
import apiService from './api';
import { LocationObject } from 'expo-location';

class PlaceService {
  async list() {
    return apiService.get('/places');
  }

  async details(id?: number) {
    return apiService.get(`/place/${id}`);
  }

  async create(photo: CameraCapturedPicture, location?: LocationObject) {
    const data = new FormData();
    const filename = photo.uri.split('/').pop();

    data.append('place', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: filename
    } as any);
    data.append('latitude', location?.coords.latitude as any);
    data.append('longitude', location?.coords.longitude as any);

    console.log({ location: location?.coords, photo });

    return apiService.post('/place/save', data);
  }
}

const placeService = new PlaceService();
export default placeService;
