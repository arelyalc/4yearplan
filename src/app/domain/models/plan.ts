import { Serializable } from './../interfaces/serializable';

export class Plan implements Serializable<Plan> {
    name?: string;
    date?: Date;
    userId?: string;
    sem1: string[];
    sem2: string[];
    sem3: string[];
    sem4: string[];
    sem5: string[];
    sem6: string[];
    sem7: string[];
    sem8: string[];
    altCourses: string[];

    constructor() {}

    deserialize(input: object): Plan {
        const plan = new Plan();
        plan.name = input['name'];
        plan.date = input['date'];
        plan.sem1 = input['sem1'];
        plan.sem2 = input['sem2'];
        plan.sem3 = input['sem3'];
        plan.sem4 = input['sem4'];
        plan.sem5 = input['sem5'];
        plan.sem6 = input['sem6'];
        plan.sem7 = input['sem7'];
        plan.sem8 = input['sem8'];
        plan.altCourses = input['alrCourses'];
        return plan;
    }
    serialize(obj: object): string {
        return JSON.stringify(obj);
    }
}
