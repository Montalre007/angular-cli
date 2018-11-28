import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'file-upload',
  template: `
    <nz-upload
      [nzFileList]="fileList"
      nzAction="http:/qmjk/qmjk/fileUpload/uploadFile"
      (nzChange)="handleChange($event)">
      <button nz-button>
        <i nz-icon type="upload"></i><span>文件上传</span>
      </button>
    </nz-upload>
  `
})
export class FileUpload implements OnChanges {
  fileArray = [];
  fileList = [];
  @Input() fileUploadId: any;
  @Input() fileType: any;
  @Input() fileListInit: any;
  @Output() sendFileId: EventEmitter<any> = new EventEmitter();
  loading = false;
  ngOnChanges (changes: SimpleChanges) {
    console.log(this);
    if (this.fileListInit && this.fileListInit.length > 0) {
      const fileListArray = [];
      this.fileListInit.forEach((data, index) => {
        fileListArray.push({
          uid: data.createUid + index,
          name: data.fileName,
          url: 'http:/qmjk/qmjk/fileUpload/downloadFileByResourceId?resourceId=' + data.resourceId
        });
      });
      this.fileList = fileListArray;
    }
  }
  handleChange(info: { file: UploadFile, fileList: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    } else {
      // Get this url from response in real world.
      this.fileList = this.fileType === 'single' ? info.fileList.splice(-1) : info.fileList;
      for (const i in this.fileList) {
        const fileData = this.fileList[i];
        fileData.url = 'http:/qmjk/qmjk/fileUpload/downloadFileByResourceId?resourceId=' + fileData.response.data.resourceId;
      }
      if (this.fileType === 'single') {
        const data = {
          fileType: this.fileUploadId,
          fileId: info.file.response.data.resourceId
        };
        this.sendFileId.emit(data);
      } else if (this.fileType === 'more') {
        this.fileArray.push(info.file.response.data.resourceId);
        const fileIds = this.fileArray.join(',');
        const data = {
          fileType: this.fileUploadId,
          fileId: fileIds
        };
        this.sendFileId.emit(data);
      }
      return;
    }
  }
}
