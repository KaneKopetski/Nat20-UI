import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CharacterBuildRequest} from '../model/character-build/character-build-request-model';
import {Constants} from '../../../shared/constants/constants';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error-response/error-response-model';
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;

  characterBuildRequest: CharacterBuildRequest;

  selectable = true;
  removable = true;
  isLinear = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public cbFormService: CharacterBuilderFormService) {
  }

  ngOnInit(): void {
    // this.setupForms();
    this.toastr.overlayContainer = this.toastContainer;
    // this.watchFormControls();
  }

  private handleError(error: ErrorResponse) {
    let errorMessage;
    let errorTitle;
    switch (error.status) {
      case 500: {
        errorMessage = Constants.GENERIC_ERROR_MSG;
        errorTitle = Constants.ERROR_TITLE_MSG;
      }         break;
      case 404: {
        errorTitle = Constants.RESOURCE_NOT_FOUND_MSG;
        errorMessage = Constants.CHARACTER_BUILDER_RESOURCE_ERROR_MSG;
      }         break;
    }
    this.toastr.error(errorMessage, errorTitle);
  }
}


