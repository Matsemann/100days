export interface User {
    id: number;
    name: string;
    days: { [day: string]: number; };
}