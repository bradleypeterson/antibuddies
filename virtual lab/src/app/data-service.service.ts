import { Injectable } from '@angular/core';
import { Node } from './labview/interfaces/NodeInterface';
import { ILab } from './labview/interfaces/labInterface';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  ngOnInit(): void {
  }
  private labs: ILab[]  =[]
  
 setLab(lab: ILab) {      
    this.labs.push(lab)
  }  
  
  getLab(index: number) {  
   // return this.labs[index]

     return this.labs.find(i=> i.labId=== index)
  }  

  getLabs()
  {
    return this.labs
  }
}
