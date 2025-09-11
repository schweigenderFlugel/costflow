export interface SuccessResponse {
  description?: string;
  message?: string;
  error?: string;
  detail?: [
    {
      loc: [string, number];
      msg: string;
      type: string;
    }
  ];
}
