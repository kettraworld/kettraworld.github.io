/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly key: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}