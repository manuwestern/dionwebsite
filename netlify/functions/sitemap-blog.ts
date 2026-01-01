import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const GHOST_API_URL = 'https://srv1044854.hstgr.cloud';
const GHOST_API_KEY = '4e0c0e8b7f3b0e0e0e0e0e0e0e';

interface GhostPost {
  slug: string;
  updated_at: string;
}

interface GhostAPIResponse {
  posts: GhostPost[];
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // Fetch all blog posts from Ghost API
    const response = await fetch(
      `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&limit=all&fields=slug,updated_at`
    );

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status}`);
    }

    const data: GhostAPIResponse = await response.json();
    const posts = data.posts || [];

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Overview Page -->
  <url>
    <loc>https://www.dionhairclinic.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Individual Blog Posts -->
${posts
  .map(
    (post) => `  <url>
    <loc>https://www.dionhairclinic.com/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      body: xml,
    };
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Error generating blog sitemap',
    };
  }
};

export { handler };
