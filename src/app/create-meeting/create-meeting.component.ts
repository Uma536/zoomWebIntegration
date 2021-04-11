import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatSnackBar } from '@angular/material';
import { ZoomIntegrationService } from '../services/zoom-integration.service';

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
  newMeetingDetails: any;
  enddatetime: any;
  body: {};
  constructor(public httpClient: HttpClient, private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar, private zoomapiService: ZoomIntegrationService) {

  }
  ngOnInit() {
    this.meetingCreateForm();
  }
  meetingCreateForm() {
    this.createMeetingForm = new FormGroup({
      email: new FormControl({ value: '', disabled: true }),
      title: new FormControl('', Validators.required),
      datepicker: new FormControl('', Validators.required),
      enddatetimepicker: new FormControl('', Validators.required)
    });
  }
  createMeeting() {
    this.isLoad = true;
    this.zoomapiService.createtingMeetingApi(this.body).subscribe((res) => {
      console.log('api data', res);
      if (res != null) {
        this.dataRes = JSON.parse(res);
        console.log('details', this.dataRes);
        this.isLoad = false;
        this.snackBar.open('Meeting Created Successfully', '', {
          duration: 1000,
        });
      }
      this.meetingDetails = JSON.parse(res);
      console.log(this.meetingDetails.host_email);
      this.topic = JSON.stringify(this.createMeetingForm.value.title);
      console.log('topic', this.topic);
      this.datepicker = JSON.stringify(this.createMeetingForm.value.datepicker);
      console.log('duration', this.datepicker);
      this.btnDisabled = false;
    });
  }
  openDialog(): void {
    this.datepicker = this.createMeetingForm.value.datepicker;
    this.topic = this.createMeetingForm.value.title;
    this.enddatetime = this.createMeetingForm.value.enddatetimepicker;
    // tslint:disable-next-line:align
    // tslint:disable-next-line:max-line-length
    this.newMeetingDetails = Object.assign(this.meetingDetails, { duration: this.datepicker.toLocaleString() },
      { zoomtopic: this.topic }, { endduration: this.enddatetime.toLocaleString() });
    console.log('new meetinfg details', this.newMeetingDetails.meetingDetails);
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '650px',
      // data: {
      //  meetingDetails: this.meetingDetails,
      // }
      data: this.meetingDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

