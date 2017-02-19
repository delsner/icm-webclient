import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Email } from '../shared';
import { AppState } from '../../app.service';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html'
})

export class ContextComponent {

  @Input() email: any;

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.appState.get('user');
  }

}