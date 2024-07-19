export type Config = {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  region: string;
};

export type ServerError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

export type Output = {
  text: string
  stop_reason: string | null
}