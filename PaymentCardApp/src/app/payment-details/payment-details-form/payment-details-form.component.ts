import { Component, OnInit } from '@angular/core';
import {PaymentDetailService} from "../../shared/payment-detail.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PaymentDetail} from "../../shared/payment-detail.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {
  form: NgForm;
  submitForm : FormGroup;
  constructor(public service:PaymentDetailService,private  fb: FormBuilder,private toastr: ToastrService) {
    this.submitForm = this.fb.group({
      ownName: [null,Validators.required],
      carNumber: [null,[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      securityC: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
      validateD: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(5)]]
    })
  }

  Americanimg = '/assets/image/american.png';
  Visaimg = '/assets/image/visa.png';
  MasterCardimg = '/assets/image/mastercard.png';
  oneOfThem = '/assets/image/temp.gif';

  ngOnInit(): void {
    this.service.refreshList();
  }
  onSubmit(form: NgForm) {
    if(this.service.formData.id == 0){
      this.insertRecord(form);
      this.toastr.success("Added Successfully!")
    }
    else{
      this.updateRecord(form);
      this.toastr.success("Updated Successfully!")
    }

  }
  resetForm(form :NgForm){
    this.service.formData = new PaymentDetail();
  }

    insertRecord(form : NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err =>{
        console.log(err)}
    )
  }
  updateRecord(form : NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err =>{
        console.log(err)}
    )
  }

  pupulateForm(selectedRecord: PaymentDetail) {
    this.service.formData =Object.assign({}, selectedRecord);
    console.log(this.service.formData.id);
  }
  matDelete: boolean = false;
  onDelete(id: number) {
      this.service.deletePaymentDetail(id).subscribe(
        res => {this.service.refreshList();
          this.toastr.error("Deleted Successfully!")
      },
    err => {
      console.log(err)}
      )
  }

  changeCardNumber($event: any) {
    if ($event.startsWith("34") || $event.startsWith("37")) {
      this.oneOfThem = this.Americanimg;
    } else if ($event.startsWith("51") || $event.startsWith("52") || $event.startsWith("53") || $event.startsWith("54") || $event.startsWith("55")) {
      this.oneOfThem = this.MasterCardimg;
    } else if ($event.startsWith("4")) {
      this.oneOfThem = this.Visaimg;
    }
  }

  changeValidateDate($event: any) {
    if($event.length == 2){
      this.submitForm.get('validateD')?.setValue($event + "/");
    }
  }
}
