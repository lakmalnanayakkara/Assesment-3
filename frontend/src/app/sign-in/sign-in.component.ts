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
    const { username, password } = this.signInForm.value;
    const data = {
      Username: username,
      Password: password,
    };

    this.appService.signInUser(data).subscribe(
      (response) => {
        const data = response.Response_Body[0].User_Locations;
        this.router.navigate(['/purchase-bill-form']);
        const filteredLocations = data.map((loc: any) => ({
          Location_Code: loc.Location_Code,
          Location_Name: loc.Location_Name,
        }));

        this.appService.saveUserLocations(filteredLocations).subscribe(
          (res) => {
            console.log('Saved to DB:', res);
            this.router.navigate(['/purchase-bill-form']);
          },
          (err) => {
            console.error('Error saving locations:', err);
          }
        );
      },
      (error) => {
        console.error(error);
        this.router.navigate(['']);
      }
    );
  }
}
