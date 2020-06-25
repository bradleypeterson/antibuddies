import { Injectable } from '@angular/core';
import { ILab } from '../interfaces/labInterface';
// for http requests
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LabService {
    private labUrl = 'urltogetlabs/api/labs';

    // inject the httpService dependency
    constructor(private http: HttpClient) {}
    
    getLabs(): /*Observable<ILab[]>*/ ILab[] {

        // return this.http.get<ILab[]>(this.labUrl);

        return [
            {
                "labId": 1,
                "labName": "Lab #1: First Project",
                "labDescription": "A new lab",
                "publishDate": new Date(),
                "nodeCount": 20
            },
            {
                "labId": 2,
                "labName": "Lab #2: Transfusion #1",
                "labDescription": "Another placeholder lab",
                "publishDate": new Date(),
                "nodeCount": 24
            },
            {
                "labId": 3,
                "labName": "Lab #3: The Third Lab",
                "labDescription": "The third lab in the series",
                "publishDate": new Date(),
                "nodeCount": 17
            },
        ];
    }
}