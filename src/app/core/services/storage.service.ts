import { Inject, Injectable, InjectionToken } from '@angular/core';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'app-local-storage',
  { factory: storageFactory }
);