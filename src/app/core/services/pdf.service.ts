import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) {}

  openPdf(fileName: string): void {
    const filePath = `assets/${fileName}`;

    this.http.get(filePath, { responseType: 'blob' }).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }, error => {
      console.error('Error loading PDF:', error);
    });
  }
}
