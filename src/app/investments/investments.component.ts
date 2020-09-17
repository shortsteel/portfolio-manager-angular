import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  cashAccount = new Array();
  investments = new Array();
  netWorth: number;
  totalCash: number;
  totalInvestment: number;
  today: number = Date.now();

  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // 后台数据的请求地址，如果变量定义后不再重新赋值，则应该使用const来定义
    this.getCash();
    this.getInvestment();
    this.getTotalInvestment();
    this.getTotalCash();
    this.getNetWorth();
  }

  getCash(): void {
    const url = 'http://localhost:8080/cashFlow/test';
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.cashAccount = response;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
    // this.cashAccount.forEach(val => {this.totalCash += val.value; });
  }

  getInvestment(): void {
    const url = 'http://localhost:8080/investmentinfo';
    // 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.investments = response;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
    // this.investments.forEach(val => {this.totalInvestment += val.value; });
  }

  getNetWorth(): void {
    this.netWorth = this.totalCash + this.totalInvestment;
  }

  getTotalCash(): void {
    this.totalCash = 5437;
  }

  getTotalInvestment(): void {
    this.totalInvestment = 467826600;
  }

}
