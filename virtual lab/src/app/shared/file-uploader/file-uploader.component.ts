import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploader implements OnInit {

  fileTypes: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(event) {

  }

}
