import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { GoogleChartComponent } from 'ng2-google-charts';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalSummary;
  lastUpdate;
  countries = []
  statusArray = ['Confirmed', 'Death', 'Recovered', 'Active']
  confirmed;
  deaths;
  recovered;
  active;
  newStatus;
  pieChart = {
    chartType: 'PieChart',
    dataTable: [],
    options: {
      height: 500
    }
  }
  columnChart = {
    chartType: 'ColumnChart',
    dataTable: [],
    options: {
      height: 500
    }
  }
  chartDisplay = false
  index;
  constructor(private getDataService: GetDataService, private spinner: NgxSpinnerService) {
    spinner.show()
   }

  ngOnInit() {
    this.spinner.show()
    this.chartDisplay = false
    this.newStatus = false
    this.index=0
    this.getDataService.getSummary().subscribe((data: any) => {
      this.globalSummary = data.Global
      this.lastUpdate = data.Date
      this.countries = data.Countries;
      this.confirmed = this.globalSummary.TotalConfirmed;
      this.deaths = this.globalSummary.TotalDeaths;
      this.recovered = this.globalSummary.TotalRecovered;
      this.active = this.confirmed - (this.deaths + this.recovered)
      this.initializeCharts(this.index)
    })
  }

  initializeCharts(i) {
   // this.spinner.show()
    this.chartDisplay = false
    let dataTable = [];
    dataTable.push(['Country', 'Cases']);
    if(this.newStatus){
      switch (i) {
        case 0:
          this.countries.forEach(con => {
            if (con.NewConfirmed) {
              dataTable.push([
                con.Country,
                con.NewConfirmed
              ])
            }
          })
          break;
        case 1:
          this.countries.forEach(con => {
            if (con.NewDeaths) {
              dataTable.push([
                con.Country,
                con.NewDeaths
              ])
            }
          })
          break;
        case 2:
          this.countries.forEach(con => {
            if (con.NewRecovered) {
              dataTable.push([
                con.Country,
                con.NewRecovered
              ])
            }
          })
          break;
        case 3:
          this.countries.forEach(con => {
            if (con.TotalConfirmed - (con.TotalRecovered + con.TotalDeaths) > 200) {
              dataTable.push([
                con.Country,
                con.TotalConfirmed - (con.TotalRecovered + con.TotalDeaths)
              ])
            }
          })
      }
    }else{
      switch (i) {
        case 0:
          this.countries.forEach(con => {
            if (con.TotalConfirmed > 2000) {
              dataTable.push([
                con.Country,
                con.TotalConfirmed
              ])
            }
          })
          break;
        case 1:
          this.countries.forEach(con => {
            if (con.TotalDeaths > 100) {
              dataTable.push([
                con.Country,
                con.TotalDeaths
              ])
            }
          })
          break;
        case 2:
          this.countries.forEach(con => {
            if (con.TotalRecovered > 200) {
              dataTable.push([
                con.Country,
                con.TotalRecovered
              ])
            }
          })
          break;
        case 3:
          this.countries.forEach(con => {
            if (con.TotalConfirmed - (con.TotalRecovered + con.TotalDeaths) > 200) {
              dataTable.push([
                con.Country,
                con.TotalConfirmed - (con.TotalRecovered + con.TotalDeaths)
              ])
            }
          })
      }
    }
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
    console.log(this.pieChart)
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
    this.chartDisplay = true
    this.spinner.hide()
  }

  updateNewStatus() {
    this.newStatus = !this.newStatus
    if (this.newStatus) {
      this.confirmed = this.globalSummary.NewConfirmed;
      this.deaths = this.globalSummary.NewDeaths;
      this.recovered = this.globalSummary.NewRecovered;
    }
    else {
      this.confirmed = this.globalSummary.TotalConfirmed;
      this.deaths = this.globalSummary.TotalDeaths;
      this.recovered = this.globalSummary.TotalRecovered;
    }
    this.initializeCharts(this.index)
    //this.active = this.confirmed -(this.deaths + this.recovered)
  }
}
