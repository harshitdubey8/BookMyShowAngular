import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theatre-card',
  templateUrl: './theatre-card.component.html',
  styleUrls: ['./theatre-card.component.css'],
})
export class TheatreCardComponent {
  @Input() name!: string | undefined;
  @Input() location!: string | undefined;
  @Input() price!: String | undefined;

  constructor() {}
}
