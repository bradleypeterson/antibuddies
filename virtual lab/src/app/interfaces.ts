
//labs container for all labs
export class LabsContainer {
    //labs array
    labs:lab[] = []

    constructor(){ }

    //create lab from labname, checks if the lab already exists first, has to be unique
    createLab(labName:string):lab {
        //check if lab already exists
        if (this.findLabByName(labName) == -1) {
            let templab = new lab(labName,this.labs.length)
            //add to labs array
            this.labs.push(templab)
            return templab
        } else {
            //name already exists, throw error
            throw "Error: lab "+labName+" already exists"
        }
    }

    //return the index if found, otherwise -1
    findLabByName(name:string):number{
        let foundIndex:number = -1
        for (let i = 0;i<this.labs.length;i++) {
            if (this.labs[i].name === name) {
                foundIndex = i
            }
        }
        return foundIndex;
    }
}


//lab class
export class lab {
    labID:number
    nodes:any[] = []
    description:string
    name:string
    //construction, labname and labID, called from labsContainer
    constructor(labName:string,labID:number) {
      this.labID = labID
      this.name = labName
    }
  
    
    createQuizNode(nodeName:string):Quiznode{
        //check if lab already exists:
        if (this.findNodeByName(nodeName) == -1) {
            let tempNode = new Quiznode(nodeName,this.nodes.length)
            this.nodes.push(tempNode)
            return tempNode
        } else {
            throw "Error: Node "+nodeName+" already exists"
        }
    }

    findNodeByName(name:string):number{
        let foundIndex = -1
        for (let i = 0;i<this.nodes.length;i++){
            if (this.nodes[i].name === name){
                foundIndex = i
            }
        }
        return foundIndex
    }
  }
  

  //parent class for other node types
  class node{
      constructor(name:string,nodeID:number) {
          this.nodeID = nodeID
          this.name = name
      }
      name:string;
      nodeID:number;
      outGoingNodes:number[]=[];
  }

  //quiz nodeType
  export class Quiznode extends node {
    description: string;
    question: string;
    answers: answerClass[] = [];
    //intended to be called from lab class
    constructor(nodeName:string,nodeID:number){
        super(nodeName,nodeID) //parent constructor
    }
    createAnswer(answerText:string,connectingNodeID:number):answerClass{
        //check if this answer already exists:
        if (this.findAnswerByText(answerText) == -1) {
            let tempAnswer = new answerClass(answerText,connectingNodeID,this.answers.length)
            //add to outgoing nodes from parent
            this.outGoingNodes.push(connectingNodeID);
            this.answers.push(tempAnswer)
            return tempAnswer
        } else {
            throw "Error: Answer: "+answerText+" already exists"
        }
    }
    findAnswerByText(name:string):number{
        let foundIndex = -1
        for (let i = 0;i<this.answers.length;i++){
            if (this.answers[i].answerText === name){
                foundIndex = i
            }
        }
        return foundIndex
    }
  }
  
  export class answerClass {
      //intended to be called from quizNode class
    constructor(answerText:string,connectingNodeID:number,answerID:number){
      this.answerText = answerText
      this.connectingNodeID = connectingNodeID
      this.answerID = answerID
    }
    answerID:number;
    answerText:string;
    connectingNodeID:number;
  }

