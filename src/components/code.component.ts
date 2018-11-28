import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'code',
  template: `
    <canvas [width]="width" [height]="height"  (click)="getCode()"></canvas>
  `
})
export class CodeComponent {
  @Input() width: any;
  @Input() height: any;
  @Output () sendCode: EventEmitter<any> = new EventEmitter();
  result = '';
  str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  constructor (private elementRef: ElementRef) {}
  ngAfterViewInit () { // 模板中的元素已创建完成
    this.getCode();
  }
  randomRange (a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  randomColor () {
    return 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + this.randomRange(70, 100) * 0.01 + ')';
  }
  getCode () {
    const can = this.elementRef.nativeElement.querySelector('canvas');
    const ctx = can.getContext('2d');
    this.result = '';
    ctx.clearRect(0, 0, can.width, can.height);
    for (let i = 0; i < 4; i++) {
      const res = this.str[this.randomRange(0, this.str.length - 1)];
      this.result += res;
      ctx.font = this.randomRange(can.width / 10 + 5, can.width / 10 + 10) + 'px 微软雅黑';
      ctx.fillStyle = this.randomColor();
      ctx.textBaseline = 'middle';
      ctx.fillText(res, can.width / 6 + can.width / 5 * i, can.height / 2);
    }
    for (let i = 0; i < can.width * 2; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.randomColor();
      ctx.arc(this.randomRange(0, can.width), this.randomRange(0, can.height), this.randomRange(can.width / 100 / 3, can.width / 100), 0, Math.PI * 2, false);
      ctx.fill();
    }
    for (let i = 0; i < can.width / 10 / 2; i++) {
      ctx.beginPath();
      ctx.strokeStyle = this.randomColor();
      ctx.lineWidth = this.randomRange(can.width / 100 / 3, can.width / 100);
      ctx.moveTo(this.randomRange(0, can.width), this.randomRange(0, can.height));
      ctx.lineTo(this.randomRange(0, can.width), this.randomRange(0, can.height));
      ctx.stroke();
    }
    this.sendCode.emit(this.result);
  }
}
