export class PlaceLocation {
    address: string = '';
    city: string = '';
    latitude: number = 0;
    longitude: number = 0;
    constructor(address: string = '', city: string = '', latitude: number  | null= null, longitude: number  | null = null) {
        // this.address = address;
        // this.city = city;
        // this.latitude = latitude;
        // this.longitude = longitude;
    }
    // method to validate the location
    // validate(): boolean {
    //     if (this.address && this.city && this.latitude && this.longitude) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}