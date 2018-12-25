import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EventService } from '../event.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  Highcharts = Highcharts;
  barChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Average Rainfall'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Tokyo',
      data: []
    }]
  };

  updateFlag: boolean = false;
  isToggle = false;
  isToggleStart = false;
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    //this.isToggle = false;
    this._eventService.getBarChart().subscribe((res) => {
      console.log(res);
      this.barChartOptions.series[0].data = res;
      if(!!this.isToggleStart) {
        this.isToggle = !this.isToggle;
        this.onClickToggle();
      }
      this.updateFlag = true;
    }, (err) => {
      console.log(err);
    })
  }

  onClickToggle() {
    this.isToggleStart = true;
    this.isToggle = !this.isToggle;
    let categories = this.barChartOptions.xAxis.categories
    let data = this.barChartOptions.series[0].data;

    if (!!this.isToggle) {
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        newData.push([categories[i], data[i]]);
      }
      newData.sort((a, b) => {
        return a[1] - b[1];
      })
      categories = [];
      data = [];
      for (let i = 0; i < newData.length; i++) {
        categories.push(newData[i][0]);
        data.push(newData[i][1]);
      }
    } else {
      categories.reverse();
      data.reverse();
    }

    this.barChartOptions.xAxis.categories = categories;
    this.barChartOptions.series[0].data = data;
    this.updateFlag = true;
  }



}
