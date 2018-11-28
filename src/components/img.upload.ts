import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'img-upload',
  template: `
    <nz-upload
      nzAccept="image/*"
      nzAction="http:/qmjk/qmjk/fileUpload/uploadFile"
      nzListType="picture-card"
      [(nzFileList)]="fileList"
      [nzPreview]="handlePreview"
      (nzChange)="handleChange($event)">
      <i nz-icon type="plus"></i>
      <div class="ant-upload-text">图片上传</div>
    </nz-upload>
    <nz-modal [nzVisible]="previewVisible" [nzContent]="modalContent" [nzFooter]="null" (nzOnCancel)="previewVisible=false">
      <ng-template #modalContent>
        <img [src]="previewImage" [ngStyle]="{ 'width': '100%' }" />
      </ng-template>
    </nz-modal>
  `
})

export class ImgUpload implements OnChanges{
  @Input () imgFileId: any;
  @Input () imgFileList: any;
  @Output () sendImgFile: EventEmitter<any> = new EventEmitter();
  fileList = [];
  imgFileArray = [];
  previewImage = '';
  previewVisible = false;

  constructor() {}

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  handleChange (info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.imgFileArray.push(info.file.response.data.resourceId);
      const imgFileIds = this.imgFileArray.join(',');
      const imgFileData = {
        imgFileType: this.imgFileId,
        imgFileIds: imgFileIds
      }
      this.sendImgFile.emit(imgFileData);
    }
  }
  ngOnChanges (changes: SimpleChanges) {
    const imgFileArray = [];
    if (this.imgFileList && this.imgFileList.length > 0) {
      this.imgFileList.forEach((data, index) => {
        imgFileArray.push({
          uid: data.createUid + index,
          name: data.fileName,
          url: 'http:/qmjk/qmjk/fileUpload/downloadFileByResourceId?resourceId=' + data.resourceId
        });
      });
      this.fileList = imgFileArray;
    }
  }
}

