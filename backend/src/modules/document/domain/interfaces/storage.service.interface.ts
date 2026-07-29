export interface IStorageService {
  getPresignedUploadUrl(key: string, contentType: string): Promise<string>;

  getSignedUrl(key: string): Promise<string>;

  delete(key: string): Promise<void>;
}
