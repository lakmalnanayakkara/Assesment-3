import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signInForm = new FormGroup({
    username: new FormControl(undefined, [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private appService: AppService, private router: Router) {}

  onSubmit() {
    const data = {
      Username: this.signInForm.controls.username,
      Password: this.signInForm.controls.password,
    };

    const sub = this.appService.signInUser(data).subscribe(
      (data) => {
        console.log(data);

        this.router.navigate(['/purchase-bill-form']);
      },
      (error) => {
        this.router.navigate(['']);
      }
    );
  }
}
