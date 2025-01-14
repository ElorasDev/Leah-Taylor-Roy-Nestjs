export class CreateMediaDto {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  file_type: 'image' | 'video' | 'document';
  uploaded_by: number;
  published: boolean;
}
