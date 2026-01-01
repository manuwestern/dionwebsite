import GhostContentAPI from '@tryghost/content-api';

// Ghost CMS API Configuration
const api = new GhostContentAPI({
  url: 'https://srv1044854.hstgr.cloud',
  key: '9a66067f9535210b31a82e3350',
  version: 'v5.0'
});

// Types for Ghost API responses
export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string | null;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
  primary_author?: GhostAuthor;
  primary_tag?: GhostTag;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
  visibility: string;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
}

/**
 * Fetch all blog posts with pagination
 * @param limit - Number of posts to fetch (default: 10)
 * @param page - Page number for pagination (default: 1)
 * @returns Promise with array of blog posts
 */
export const getBlogPosts = async (
  limit: number = 10,
  page: number = 1
): Promise<GhostPost[]> => {
  try {
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch a single blog post by slug
 * @param slug - The post slug
 * @returns Promise with single blog post
 */
export const getBlogPost = async (slug: string): Promise<GhostPost> => {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    );
    return post as GhostPost;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    throw error;
  }
};

/**
 * Fetch featured blog posts
 * @param limit - Number of posts to fetch (default: 3)
 * @returns Promise with array of featured blog posts
 */
export const getFeaturedPosts = async (limit: number = 3): Promise<GhostPost[]> => {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: 'featured:true',
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw error;
  }
};

/**
 * Fetch posts by tag
 * @param tagSlug - The tag slug
 * @param limit - Number of posts to fetch (default: 10)
 * @returns Promise with array of blog posts
 */
export const getPostsByTag = async (
  tagSlug: string,
  limit: number = 10
): Promise<GhostPost[]> => {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error(`Error fetching posts by tag "${tagSlug}":`, error);
    throw error;
  }
};

/**
 * Fetch all tags
 * @returns Promise with array of tags
 */
export const getTags = async (): Promise<GhostTag[]> => {
  try {
    const tags = await api.tags.browse({
      limit: 'all'
    });
    return tags as GhostTag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

/**
 * Fetch related posts based on tags
 * @param currentPostId - ID of the current post
 * @param tags - Array of tag slugs
 * @param limit - Number of posts to fetch (default: 3)
 * @returns Promise with array of related blog posts
 */
export const getRelatedPosts = async (
  currentPostId: string,
  tags: GhostTag[],
  limit: number = 3
): Promise<GhostPost[]> => {
  try {
    if (!tags || tags.length === 0) {
      return [];
    }

    const tagSlugs = tags.map(tag => tag.slug).join(',');
    const posts = await api.posts.browse({
      limit: limit + 1, // Fetch one extra to exclude current post
      filter: `tag:[${tagSlugs}]`,
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    });

    // Filter out the current post and limit results
    return (posts as GhostPost[])
      .filter(post => post.id !== currentPostId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export default api;
