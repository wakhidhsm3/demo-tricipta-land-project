// Components
export { AboutProjectSection } from './components/about-project-section';
export { BuildingSpecsSection } from './components/building-specs-section';
export { InteractiveProjectCatalog } from './components/interactive-project-catalog';
export { LocationFacilitiesSection } from './components/location-facilities-section';
export { ProjectCard } from './components/project-card';
export { ProjectDetailHero } from './components/project-detail-hero';
export { ProjectGalleryLightbox } from './components/project-gallery-lightbox';
export { ProjectInquiryForm } from './components/project-inquiry-form';
export { ProjectListingHeader } from './components/project-listing-header';
export { ProjectStatusBadge, ProjectCategoryBadge } from './components/project-badges';
export { SitePlanViewer } from './components/site-plan-viewer';
export { UnitTypesSection } from './components/unit-types-section';

import { projectRepository } from './repositories/project.repository';

// Data Access Layer
export { projectRepository };
export { projectsData } from './data/projects.data';
export const getAllProjects = () => projectRepository.getAll();
export const getAllProjectSummaries = () => projectRepository.getAllSummaries();
export const getAllProjectIds = () => projectRepository.getAllIds();
export const getAllProjectLocations = () => projectRepository.getAllLocations();
export const getFeaturedProjects = () => projectRepository.getFeatured();
export const getProjectById = (id: string) => projectRepository.getById(id);

// Validations
export {
  projectInquirySchema,
  type ProjectInquirySchemaType,
} from './validations/inquiry.validation';
export {
  projectFilterSchema,
  parseProjectFilterParams,
  type ProjectFilterSchemaType,
} from './validations/project-filter.validation';

// Types
export {
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_CATEGORY_LABEL_MAP,
  PROJECT_STATUS_LABEL_MAP,
  toProjectSummary,
} from './types/project.type';

export type {
  Project,
  ProjectSummary,
  ProjectCategory,
  ProjectStatus,
  ProjectFilterOption,
  ProjectUnitType,
  ProjectSpecifications,
  NearbyFacility,
} from './types/project.type';
