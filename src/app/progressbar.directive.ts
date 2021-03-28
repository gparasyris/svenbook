import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Directive, ElementRef, Inject, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProgressbarComponent } from './shared/progressbar/progressbar.component';

@Directive({
  selector: '[appProgressbar]'
})
export class ProgressbarDirective {

  @Input('width') width: string;
  @Input('height') height: string;
  @Input('color') color: string;
  @Input('current') current: number;
  @Input() max: number;


  // constructor(
  //   // private templateRef: TemplateRef<void>,
  //   //           private vcr: ViewContainerRef,
  //   //           private cfr: ComponentFactoryResolver,
  //             private el: ElementRef) { }
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) { }

  ngOnInit() {
    // this.vcr.createEmbeddedView(this.templateRef)
    //   const cmpFactory = this.cfr.resolveComponentFactory(ProgressbarComponent)
    //   const cmp = this.vcr.createComponent(cmpFactory)
    //   cmp.instance.width = this.width;
    //   cmp.instance.height = this.height;

    //   cmp.instance.height = this.el.nativeElement.nativeElement.getBoundingClientRect()?.height || 0;

    //// background-color: lightgreen;
    //// width: 0px;
    //// position: absolute;
    //// left: 0;
    // // top: 0;
    // height: 100%;
    //// z-index: -1;
    // &.ask {
    //   background-color: pink;
  
    // }
    const child = document.createElement('div');
    child.style.width = (((this.current/this.max) * 100) || 0) + '%';
    child.style.height = this.height;
    child.style.backgroundColor = this.color;
    child.style.position = 'absolute';
    child.style.left = '0';
    // child.style.zIndex = '-1';
    child.style.opacity = '0.4';
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }
}