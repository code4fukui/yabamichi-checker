export interface IPoint {
  lat: number;
  lng: number;
}

export interface IDangerSpot extends IPoint {
  txt: string;
}
