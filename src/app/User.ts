export interface User {

    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    name: string;
    job: string;
}
// for checking if can be fetched data api
export interface Daum {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }