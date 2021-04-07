import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {
  createMeetingForm: FormGroup;
  meetingDetails: any;
  isLoad = false
  title: any;
  isEnable = false

  url = 'http://localhost:3000/createmeeting';
  constructor(public httpClient: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog,private _snackBar: MatSnackBar) {

  }
  ngOnInit() {
    this.meetingCreateForm();
  }

  meetingCreateForm() {
    this.createMeetingForm = new FormGroup({
        email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    title: new FormControl('',Validators.required),
    datepicker: new FormControl('',Validators.required)
    });
    this.isEnable = true;
  }
  // meetingCreateForm() {
  //   // userFirstName: new FormControl(''),
  //   // tslint:disable-next-line:max-line-length
  //   const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   this.createMeetingForm = this.formBuilder.group({
  //     email: [null, [Validators.required, Validators.pattern(emailregex)]],
  //     title: [null],
  //     datepicker: [null]
  //   // datepicker: new FormControl(''),
  //   });
  // }

    
  //  });
  // tslint:disable-next-line:typedef
  createMeeting(body: any) {
      this.isLoad = true;
    console.log('data', body);
    // let type: string = "application/x-www-form-urlencoded; charset=UTF-8";
    const options = {responseType: 'text' as 'json'};
    const bodyString = JSON.parse(JSON.stringify(body || null ));
    // tslint:disable-next-line:max-line-length
    // const headers = { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjljY0p1QUh5U3RXY18yMTI3OEhpRGciLCJleHAiOjE2MTcyNzc5NjgsImlhdCI6MTYxNzI3MjU2OX0.DO6Zskh-_WWF3WvefmjdcrMVDIDKk-QJUyJi-tdW9f4', responseType: 'text'};
    this.httpClient.post('http://localhost:3000/createmeeting', bodyString, options).subscribe((data: any) => {
      // tslint:disable-next-line:one-line
      if (data != null){
         this.isLoad = false;
        console.log(JSON.parse(data));
        this._snackBar.open('Meeting Created Successfully', '', {
          duration: 1000,
        });
      }
      this.meetingDetails = JSON.parse(data);
      console.log(this.meetingDetails.id);
      this.title = JSON.stringify(this.createMeetingForm.value.title)
      console.log(this.title)
    });
  }


  isDisabled() {
    if (this.createMeetingForm.dirty || this.isEnable) {
      return false
    }
    return true
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '650px',
      data: this.meetingDetails,
      // zoomTitle: this.title
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

