import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FileUploadResponse } from 'src/app/shared/types';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  file?: File;
  fileName?: string;
  imageUrl?: string;

  constructor(private api: ApiService) { }

  handleFileUploadClick(event: any) {
    const file: File = event.target.files[0];

    if (!file) return;

    this.file = file;
    this.fileName = file.name;
  }

  uploadFile() {
    if (!this.file) return;

    const formData: FormData = new FormData();
    formData.append('file', this.file);

    this.api.uploadFile(formData).subscribe((data: FileUploadResponse) => {
      this.imageUrl = data.url;
    });
  }
}
