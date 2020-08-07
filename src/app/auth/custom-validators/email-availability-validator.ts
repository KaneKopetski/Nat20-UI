import {AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { Observable, of } from "rxjs";
import {debounceTime, map, switchMap, take} from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EmailAvailabilityValidator {

  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.getProvidersObservable(control.value)
      .pipe(
        map((providers) => {
          return providers.length > 0 ? { unavailable: true } : null;
        })
      );
  }


}
