import { Node } from '../interfaces/NodeInterface';

export interface ILab {
    labId: number;
    labName: string;
    labDescription: string;
    publishDate: Date;
    course: string;
    nodeCount: number;
    nodes: Node[];
}