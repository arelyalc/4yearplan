import {Serializable} from '../interfaces';

export class User implements Serializable<User> {
    id?: string;
    email?: string;
    name?: string;
    smuId?: number;
    password?: string;


    constructor() {}

    deserialize(input: object): User {
        const user = new User();
        user.id = input['id'];
        user.email = input['email'];
        user.name = input['name'];
        user.smuId = input['smuId'];
        return user;
    }
    serialize(obj: object): string {
        return JSON.stringify(obj);
    }
}
