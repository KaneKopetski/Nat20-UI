import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EmailExistsValidator {

  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.getProvidersObservable(control.value)
      .pipe(
        map((providers) => {
          return providers.length > 0 ? null : { notExists: true };
        })
      );
  }


}
