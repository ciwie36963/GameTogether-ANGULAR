import { Component, OnInit, Input } from '@angular/core';
import { Division } from './division.model';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  @Input() public division : Division;

  constructor() { }

  ngOnInit() {
  }

}
