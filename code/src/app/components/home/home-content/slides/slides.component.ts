import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Recipe} from "../../../../interfaces/recipe.interface";

@Component({
  selector: 'pec-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  @Input() recipes: Recipe;
  @Input() mainImg: number;
  @Input() title: string;
  @ViewChild('slidesDiv') slidesDiv: ElementRef;
  @ViewChild('prev') prev: ElementRef;
  @ViewChild('next') next: ElementRef;

  ngOnInit() {
  }


  /**
   * ScrollDiv
   * @param destination
   */
  scrollDiv(destination: string) {
    let containerNode = this.slidesDiv.nativeElement;
    let maxScrollWidth = containerNode.scrollWidth - containerNode.clientWidth;

    if (destination === 'right') {
      containerNode.scroll({left: maxScrollWidth, behavior: 'smooth'});
    }
    else if (destination === 'left') {
      containerNode.scroll({left: 0, behavior: 'smooth'});
    }

    this.prev.nativeElement.style.opacity = destination === 'right' ? 1 : 0;
    this.next.nativeElement.style.opacity = destination === 'right' ? 0 : 1;
  }
}
