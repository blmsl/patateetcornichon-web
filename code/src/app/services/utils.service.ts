import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class UtilsService {

  constructor(private _router: Router,
              private _snackBar: MatSnackBar) {
  }

  /**
   * Return a random number
   * @param array
   * @returns {number}
   */
  public random(array: Object[]) {
    return Math.floor(Math.random() * array.length)
  }

  /**
   * Redirect the user to 404 page
   */
  public redirectIf404() {
    this._router.navigate(['**']);
  }

  /**
   * Create the SnackBar
   * @param result
   * @param message
   * @returns {MatSnackBarRef<SimpleSnackBar>}
   */
  public snackBar(result: string, message: string) {
    const config = new MatSnackBarConfig();

    // Success message
    if (result === 'success') {
      config.duration = 5000;
      config.extraClasses = ['custom-snackbar', 'custom-snackbar-success'];
      return this._snackBar.open(message, null, config);
    }

    // Pending message
    else if (result === 'pending') {
      config.extraClasses = ['custom-snackbar', 'custom-snackbar-await'];
      return this._snackBar.open(message, null, config);
    }

    // Error message
    else if (result === 'error') {
      config.duration = 5000;
      config.extraClasses = ['custom-snackbar', 'custom-snackbar-error'];
      return this._snackBar.open(message, null, config);
    }
  }

}
