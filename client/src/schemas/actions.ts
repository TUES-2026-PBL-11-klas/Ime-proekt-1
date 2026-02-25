export type ServerActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};
