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
  isLoad = false;
  btnDisabled = true;
  topic: any;
  dataRes: any;
  url = 'http://localhost:3000/createmeeting';
  datepicker: any;
  constructor(public httpClient: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar) {

  }
  ngOnInit() {
    
    this.meetingCreateForm();

  }

  meetingCreateForm() {
    this.createMeetingForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }),
    topic: new FormControl('', Validators.required),
    datepicker: new FormControl('', Validators.required)
    });
  }
//   get email() 
//   { return this.createMeetingForm.get('email')
// }; 

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
         this.dataRes = JSON.parse(data);
         console.log('details', this.dataRes);
         this._snackBar.open('Meeting Created Successfully', '', {
          duration: 1000,
        });
      }
      this.meetingDetails = JSON.parse(data);
      console.log(this.meetingDetails.host_email);
      this.topic = JSON.stringify(this.createMeetingForm.value.topic);
      console.log('topic', this.topic);
      this.datepicker = JSON.stringify(this.createMeetingForm.value.datepicker);
      console.log('duration', this.datepicker);
      this.btnDisabled = false;
    });
      // this.openDialog();
  }


  // isDisabled() {
  //   if (this.createMeetingForm.dirty || this.isEnable) {
  //     return false;
  //   }
  //   return true;
  // }
  // let newList = Object.assign(ElementList, element)

  openDialog(): void {
    // this.datepicker = this.createMeetingForm.value.datepicker;
    // let newMeetingDetails = Object.assign(this.meetingDetails, {duration: this.datepicker.toLocaleString()})
    // console.log("new meetinfg details",newMeetingDetails.meetingDetails);
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '650px',
      // data: {
      //  meetingDetails: this.meetingDetails,
      // }
      // zoomTitle: this.title
      data: this.meetingDetails,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

