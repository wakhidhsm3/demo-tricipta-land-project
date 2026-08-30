import { cache } from 'react';
import { projectsData } from '../data/projects.data';
import { Project, ProjectSummary, toProjectSummary } from '../types/project.type';
import { ReadRepository, PaginationParams, PaginatedResult } from '@/lib/types/repository.type';
import { createReadRepository } from '@/lib/repositories/base.repository';
import { paginateArray } from '@/lib/utils';

export interface ProjectRepository extends ReadRepository<Project> {
  getFeatured(): Promise<Project[]>;
  getAllLocations(): Promise<string[]>;
  getAllSummaries(): Promise<ProjectSummary[]>;
  findPaginated(params?: PaginationParams): Promise<PaginatedResult<ProjectSummary>>;
}

const baseRepo = createReadRepository(projectsData);

export const projectRepository: ProjectRepository = {
  ...baseRepo,

  getFeatured: cache(async (): Promise<Project[]> => {
    return projectsData.filter((p) => p.isFeatured);
  }),

  getAllLocations: cache(async (): Promise<string[]> => {
    const locations = new Set<string>();
    projectsData.forEach((p) => locations.add(p.location.city));
    return Array.from(locations);
  }),

  getAllSummaries: cache(async (): Promise<ProjectSummary[]> => {
    return projectsData.map(toProjectSummary);
  }),

  findPaginated: cache(
    async (params: PaginationParams = {}): Promise<PaginatedResult<ProjectSummary>> => {
      const { page = 1, pageSize = 6, searchQuery = '', category = 'ALL' } = params;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      // Single-pass filter & summary projection
      const filtered: ProjectSummary[] = [];
      for (const project of projectsData) {
        if (category !== 'ALL' && project.category !== category) {
          continue;
        }

        if (
          normalizedQuery &&
          !project.name.toLowerCase().includes(normalizedQuery) &&
          !project.location.fullAddress.toLowerCase().includes(normalizedQuery) &&
          !project.location.city.toLowerCase().includes(normalizedQuery)
        ) {
          continue;
        }

        filtered.push(toProjectSummary(project));
      }

      return paginateArray(filtered, page, pageSize);
    }
  ),
};
