import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public barChartOptions = 
  {
    scaleShowVerticalLines: false,
    responsive:false
  }


  public barChartLabels = ['Node1','Node2','Node3','Node4','Node5','Node6','Node7'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData  = [
    {data: [34,54,67,23,56,87,23], label: 'Attempt 1'},
    {data: [23,56,75,52,66,45,37], label: 'Attempt 2'}
  ]

  public pieChartOptions = 
  {
    scaleShowVerticalLines: false,
    responsive:false
  }
  public pieChartLabels = ['0-25%','25-50%','50-75%','75-100%'];
  public pieChartType = 'pie';
  public pieChartData   = [
    {data: [34,54,67,23], label: 'Series A'},
    {data: [23,56,75,52], label: 'Series B'}
  ]



  public radarChartOptions = 
  {
    scaleShowVerticalLines: false,
    responsive:false
  }
  public radarChartLabels = ['Q1','Q2','Q3','Q4'];
  public radarChartType = 'radar';
  public radarChartLegend = true;
  public radarChartData  = [
    {data: [120,130,180,70], label: 'Failed'},
    {data: [90,150,200,45], label: 'Passed'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
