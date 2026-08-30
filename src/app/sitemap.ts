import { MetadataRoute } from 'next';
import { getAllProjectIds } from '@/features/projects';
import { getAllArticleIds } from '@/features/articles';
import { getAllOrgMemberIds } from '@/features/about';
import { siteConfig } from '@/lib/config/site.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const [projectIds, articleIds, teamMemberIds] = await Promise.all([
    getAllProjectIds(),
    getAllArticleIds(),
    getAllOrgMemberIds(),
  ]);

  const projectUrls = projectIds.map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleUrls = articleIds.map((id) => ({
    url: `${baseUrl}/articles/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const teamUrls = teamMemberIds.map((id) => ({
    url: `${baseUrl}/about/team/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls, ...articleUrls, ...teamUrls];
}
