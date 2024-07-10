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
