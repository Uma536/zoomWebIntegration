import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
console.log('checkSystemRequirements');
// console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.component.html',
  styleUrls: ['./join-meeting.component.scss']
})
export class JoinMeetingComponent implements OnInit {
  meetingNumber: string;
  userName: string;
  signatureEndpoint = 'http://localhost:4000'
  apiKey = '9ccJuAHyStWc_21278HiDg'
  // meetingNumber = '89906867556'
  role = 0
  leaveUrl = 'http://localhost:4200'
  // userName = 'Angular'
  userEmail = ''
  passWord = ''
  formGroup: FormGroup;

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document,private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // this.meetingForm();
  }
  // meetingForm(){
  //   this.formGroup = this.formBuilder.group({
  //     'userName': [null, Validators.required],
  //     'meetingNumber': [null, Validators.required],
  //   });
  // }
 
  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
      meetingNumber: this.meetingNumber,
      role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}