// used to interact with model objects
export interface Serializable<T> {
    deserialize(input: object): T
    serialize(input: T): string
}
