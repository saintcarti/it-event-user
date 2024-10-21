import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private file: File, private transfer: FileTransfer) { }
  uploadFile(uri: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    // Cambia esta URL por tu endpoint de subida
    const uploadUrl = `${environment.apiUrl}/upload`;

    return fileTransfer.upload(uri, uploadUrl);
  }
}
