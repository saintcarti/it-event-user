import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {

  selectedFile: File | null = null; // Inicializa como null

  constructor(private fileService: UploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; // Asegúrate de que sea un input
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  
  uploadFile(){
    
  }
  
}
