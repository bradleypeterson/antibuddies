import {Answer  } from "../interfaces/AnswerInterface";

export interface Node
{
     nodeId: number;
     description: string;
     name: string;
     Question: string;
     answers: Answer[];
     incomingNodes: number[];
}