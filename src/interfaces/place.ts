export interface IPlaceCreated {
  place: {
    name: string;
    pictures: string[];
    items: string[];
    location: {
      latitude: number;
      longitude: number;
    }
  }
}
