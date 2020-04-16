import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countriesData = [];
  selectedCountry;
  countrySummary
  confirmed;
  deaths;
  recovered;
  active;
  newStatus;
  statusArray = ['Confirmed', 'Deaths', 'Recovered']
  index;

  lineChart = {
    chartType: 'LineChart',
    dataTable: [],
    options: {
      height: 500
    }
  }

  constructor(private getDataService: GetDataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.newStatus = false
    this.getDataService.getSummary().subscribe((data: any) => {
      this.countriesData = data.Countries
    })
  }

  onCountrySelect() {
    this.spinner.show()
    this.index =0
    this.countrySummary = this.countriesData[this.selectedCountry]
    this.confirmed = this.countrySummary.TotalConfirmed;
    this.deaths = this.countrySummary.TotalDeaths;
    this.recovered = this.countrySummary.TotalRecovered;
    this.active = this.confirmed - (this.deaths + this.recovered)
    this.getCountryData(0)
  }

  getCountryData(i) {
    this.getDataService.getDateWiseCountryData(this.countrySummary.Slug, this.statusArray[i].toLowerCase())
      .subscribe((data: any) => {
        let dataTable = [];
        dataTable.push(['Date', 'Cases'])
        data.forEach(element => {
          dataTable.push([
            element.Date.split('T')[0],
            element.Cases
          ])
        });
        this.lineChart = {
          chartType: 'LineChart',
          dataTable: dataTable,
          options: {
            height: 500
          }
        }
        console.log(this.lineChart)
      },
      error => console.log(error))
    this.spinner.hide()
  }

  updateNewStatus() {
    this.newStatus = !this.newStatus
    if (this.newStatus) {
      this.confirmed = this.countrySummary.NewConfirmed;
      this.deaths = this.countrySummary.NewDeaths;
      this.recovered = this.countrySummary.NewRecovered;
    }
    else {
      this.confirmed = this.countrySummary.TotalConfirmed;
      this.deaths = this.countrySummary.TotalDeaths;
      this.recovered = this.countrySummary.TotalRecovered;
    }
    //this.active = this.confirmed -(this.deaths + this.recovered)
  }
}
