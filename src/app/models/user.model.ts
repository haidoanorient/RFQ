export class User {
    id: string;
    userName: string;
    passWord: string;
    userType?: UserType;
}

export enum UserType {
    Applicant = 0,
    Agent = 1
}
