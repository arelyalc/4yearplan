import {Serializable} from '../interfaces';

export class User implements Serializable<User> {
    id?: number;
    email?: string;
    fullName?: string;
    studentID?: number;
    password?: string;


    constructor() {}

    deserialize(input: object): User {
        const user = new User();
        user.id = input['id'];
        user.email = input['email'];
        user.fullName = input['fullName'];
        user.studentID = input['studentID'];
        return user;
    }
    serialize(obj: object): string {
        return JSON.stringify(obj);
    }
}
