import { IVacation } from "../interfaces/IVacation";
import {IFldVacations} from "../interfaces/IFldVacations"

export class AppState{
  vacations: IVacation[] = [];
  isLogedIn = false;
  isAdmin = false;
  showModal = false;
  currentUserName = "";
  isAddVacation = false;
  isFollow = false;
  errors: string = "";
  followedVacations: IFldVacations[] = [];
  vacation: IVacation = {
    id: 0,
    description: "",
    location: "",
    image: "",
    startDate: "", 
    endDate: "",
    price: 0,
    numOfFollowers: 0,
    isFollowedByUser: false
  }
}