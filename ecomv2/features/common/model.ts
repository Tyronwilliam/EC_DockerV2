export interface LocationStateType {
  background?: string;
  state?: {
    [key: string]: any;
  };
}
export interface LocationType {
  pathname: string;
  state: LocationStateType;
}
