export interface IPlace {
  _id: number;
  name: string;
  mainPicture: string;
  pictures: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface IPlaceDetails {
  _id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  items: string[];
}
