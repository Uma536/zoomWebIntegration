import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ZoomIntegrationService } from '../services/zoom-integration.service';
import { environment } from 'src/environments/environment';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
// console.log('checkSystemRequirements');
// console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.component.html',
  styleUrls: ['./join-meeting.component.scss']
})
export class JoinMeetingComponent implements OnInit, OnChanges {


  meetingNumber: number;
  userName: string;
  signatureEndpoint = 'http://localhost:4000/getSignature';
  apiKey = '9ccJuAHyStWc_21278HiDg';
  apiSecret = 'WwW9DC8Cuw9YYmfevblgQ2jWGrAOOoVS2qvA';
  role = 1;
  leaveUrl = 'http://localhost:4200';
  userEmail = '';
  meetingPassword = '';
  zoomdetails: any;
  hide = true;
  formGroup: FormGroup;
  joinMeetingForm: FormGroup;


  @Input() childData: any;
  body: {};

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document,
              private formBuilder: FormBuilder,
              private zoomapiService: ZoomIntegrationService) {

  }
  ngOnInit() {
    this.joinMeetingCreateForm();
    const zoomnewdata = this.zoomapiService.zoomData.getValue();
    console.log('zoomdata get details', zoomnewdata);
    console.log('zoomdata get id', zoomnewdata.id);
    if (zoomnewdata != null && !!zoomnewdata) {
      this.zoomdetails = JSON.parse(zoomnewdata);
      console.log('zoomnew parsed value', this.zoomdetails);
      console.log('zoomnew id', this.zoomdetails.id);
      if (this.zoomdetails != null) {
        this.joinMeetingForm.controls.userName.setValue(this.zoomdetails.userName);
        this.joinMeetingForm.controls.meetingNumber.setValue(this.zoomdetails.id);
        this.joinMeetingForm.controls.password.setValue(this.zoomdetails.password);
         }
    }
  }
  ngOnChanges() {
    // this.zoomdetails= this.zoomapiService.zoomData.getValue()
    //  console.log("zoomdata get details",this.zoomdetails)
    console.log('data in child component', this.childData);
  }


  joinMeetingCreateForm() {
    console.log('form control', this.joinMeetingForm);
    this.joinMeetingForm = this.formBuilder.group({
      meetingNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  joinMeeting(data: any) {
    this.meetingNumber = data.meetingNumber;
    this.userName = data.userName;
    this.meetingPassword = data.password;
    console.log('formcontrol', this.joinMeetingForm.controls.userName.value);
    console.log('formcontrol meetingnumber', this.joinMeetingForm.controls.meetingNumber.value);
    console.log('formcontrol password', this.joinMeetingForm.controls.password.value);


    this.getSignature();
  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
      meetingNumber: this.meetingNumber,
      role: this.role
    }).toPromise().then((data: any) => {
      if (data.signature) {
        console.log(data.signature);
        this.startMeeting(data.signature);
      } else {
        console.log(data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block';
    // debugger;
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.meetingPassword,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          }
        });

      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
