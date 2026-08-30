import { cache } from 'react';
import { ReadRepository } from '../types/repository.type';

/**
 * Generic factory to create a cached read-only repository for in-memory datasets.
 * Eliminates repetitive boilerplate across feature repositories.
 */
export function createReadRepository<T extends { id: string }>(
  dataset: readonly T[] | T[]
): ReadRepository<T> {
  const getAll = cache(async (): Promise<T[]> => {
    return [...dataset];
  });

  const getAllIds = cache(async (): Promise<string[]> => {
    return dataset.map((item) => item.id);
  });

  const getById = cache(async (id: string): Promise<T | undefined> => {
    return dataset.find((d) => d.id === id);
  });

  return {
    getAll,
    getAllIds,
    getById,
  };
}
