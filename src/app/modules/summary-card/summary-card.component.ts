import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

  @Input('totalConfirmed') TotalConfirmed;
  @Input('totalDeaths') TotalDeaths;
  @Input('totalRecovered') TotalRecovered;
  @Input('totalActive') TotalActive;
  @Input('newRecord') newRecord;
  
  constructor() { }

  ngOnInit() {
  }

}
