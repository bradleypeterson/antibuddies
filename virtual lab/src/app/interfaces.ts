
export interface labType {
    labID: number;
    labName: string;
    nodes: Array<any>
    description: string;
}

export interface quizNode {
    nodeID: number;
    description: string;
    name: string;
    question: string;
    answers: Array<answers>;
}

export interface answers {
    answerID:number;
    answerText:string;
    connectingNode:number;
}


