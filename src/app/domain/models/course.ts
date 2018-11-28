import {Serializable} from '../interfaces';

// used to match course object from back end
export class Course implements Serializable<Course> {
    order?: number;
    id?: string;
    name?: string;
    UC?: [string];

    constructor() {}

    deserialize(input: object): Course {
        const course = new Course();
        course.order = input['order'];
        course.id = input['id'];
        course.name = input['name'];
        course.UC = input['UC'];
        return course;
    }
    serialize(obj: object): string {
        return JSON.stringify(obj);
    }
}
