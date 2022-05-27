import { CameraCapturedPicture } from 'expo-camera';
import apiService from './api';
import { LocationObject } from 'expo-location';
import { IPlaceCreated } from '~/interfaces/place';
import { AxiosResponse } from 'axios';

class PlaceService {
  async list() {
    return apiService.get('/places');
  }

  async details(id?: number) {
    return apiService.get(`/place/${id}`);
  }

  async create(photo: CameraCapturedPicture, location?: LocationObject): Promise<AxiosResponse<IPlaceCreated>> {
    const data = new FormData();
    const filename = photo.uri.split('/').pop();

    data.append('place', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: filename
    } as any);
    data.append('latitude', -23.206232 as any);
    data.append('longitude', -47.297929 as any);

    return apiService.post('/place/save', data);
  }
}

const placeService = new PlaceService();
export default placeService;
