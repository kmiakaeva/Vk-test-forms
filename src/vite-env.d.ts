/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_FACT: string;
  readonly VITE_API_URL_NAME_AGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
