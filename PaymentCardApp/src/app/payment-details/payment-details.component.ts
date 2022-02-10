import { Component, OnInit } from '@angular/core';
import {PaymentDetailService} from "../shared/payment-detail.service";
import {PaymentDetail} from "../shared/payment-detail.model";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }



}
