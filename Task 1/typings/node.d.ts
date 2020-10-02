declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MONGO_URI_TEST: string;
    MONGO_URI_PRODUCTION: string;
  }
}
