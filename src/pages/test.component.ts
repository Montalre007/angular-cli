import { Component, OnInit } from '@angular/core';
import {Api} from '../server/Api';
import {utils} from '../plugin/utils';

@Component({
  template: `
    <nz-card nzTitle="列表查询">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </nz-card>
    <nz-card nzTitle="列表数据" [nzExtra]="extraTemplate">
      <file-upload fileUploadId="attachment" fileType="single" [fileListInit]="fileList" (sendFileId)="getFileId($event)" ></file-upload>
      <file-upload fileUploadId="otherFile" fileType="more" (sendFileId)="getFileId($event)"></file-upload>
      <img-upload imgFileId="sceneImgPath" [imgFileList]="imgFileList" (sendImgFile)="getImgFileId($event)"></img-upload>
      <button nz-button (click)="getThis()">click</button>
    </nz-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `,
  styles  : [
    `p {
      margin: 0;
    }`
  ]
})
export class TestComponent implements OnInit {
  constructor (private http: Api) {}
  fileList = [];
  imgFileList = [];
  fileId = '';
  getFileId (file: any) {
    this.fileId = file.fileId;
    console.log(file);
  }
  getImgFileId (imgFile: any) {
    this.fileId = imgFile.fileId;
    console.log(imgFile);
  }
  getThis () {
    console.log(this.fileId);
  }
  ngOnInit () {
    this.http.getInstructorInfo({id: 30497, date: new Date()}, res => {
      if (null != res.data.resourceInfos && res.ret) {
        this.fileList = utils.getResource(res.data.resourceInfos, res.data.attachmentPath);
        this.imgFileList = utils.getResource(res.data.resourceInfos, res.data.sceneImgPath);
      }
    });
  }
}
