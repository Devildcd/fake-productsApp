import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirm(
    title = 'Are you sure?', 
    text = 'This action cannot be undone.', 
    confirmButtonText = 'Yes, delete', 
    cancelButtonText = 'Cancel' 
  ): Observable<boolean> {
    // Create and return an observable to handle the user's response
    return new Observable((observer) => {
      Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f50057',
        cancelButtonColor: '#3f51b5',
        confirmButtonText,
        cancelButtonText,
      }).then((result) => {
        // Emit the result of the confirmation (true if confirmed, false if canceled)
        observer.next(result.isConfirmed);
        observer.complete(); // Complete the observable
      });
    });
  }

  alertMessage(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info'
  ): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
    });
  }
}
