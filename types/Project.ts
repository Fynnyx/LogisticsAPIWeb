import { Transport } from "./Transport";

export interface Project {
    id: Number;
    keyName: String;
    name: String;
    description: String;
    transports: Transport[];
}