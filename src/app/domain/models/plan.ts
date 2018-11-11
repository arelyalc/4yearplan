import { Serializable } from './../interfaces/serializable';

export class Plan implements Serializable<Plan> {
    id?: number;
    name?: string;
    date?: Date;
    studentID?: number;
    sem1: string[];
    sem2: string[];
    sem3: string[];
    sem4: string[];
    sem5: string[];
    sem6: string[];
    sem7: string[];
    sem8: string[];

    constructor() {}

    deserialize(input: object): Plan {
        const plan = new Plan();
        plan.id = input['id'];
        plan.studentID = input['studentID'];
        plan.sem1 = input['sem1'];
        plan.sem2 = input['sem2'];
        plan.sem3 = input['sem3'];
        plan.sem4 = input['sem4'];
        plan.sem5 = input['sem5'];
        plan.sem6 = input['sem6'];
        plan.sem7 = input['sem7'];
        plan.sem8 = input['sem8'];
        return plan;
    }
    serialize(obj: object): string {
        return JSON.stringify(obj);
    }
}
