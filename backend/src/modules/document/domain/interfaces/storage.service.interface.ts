export interface IStorageService {
  upload(file: Express.Multer.File, key: string): Promise<string>;
  getSignedUrl(fileKey: string): Promise<string>;
  delete(fileKey: string): Promise<void>;
}
