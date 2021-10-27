export interface IVacation{
    id: number,
    description: string,
    location: string,
    image: string,
    startDate: string, 
    endDate: string,
    price: number,
    numOfFollowers: number,
    isFollowedByUser: boolean
}