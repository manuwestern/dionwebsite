import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import { getBlogPost, getRelatedPosts, GhostPost } from '../services/ghostApi';
import BlogCard from '../components/blog/BlogCard';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<GhostPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const fetchedPost = await getBlogPost(slug);
        setPost(fetchedPost);

        // Fetch related posts
        if (fetchedPost.tags && fetchedPost.tags.length > 0) {
          const related = await getRelatedPosts(fetchedPost.id, fetchedPost.tags, 3);
          setRelatedPosts(related);
        }

        setError(null);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Artikel konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600 mb-8">{error || 'Der gesuchte Artikel existiert nicht.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center bg-[#7BA7C2] text-white px-6 py-3 rounded-xl hover:bg-[#5A8BA6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        ogImage={post.og_image || post.feature_image || undefined}
        keywords={post.tags?.map(tag => tag.name).join(', ')}
      />

      <StructuredData 
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          url: `https://www.dionhairclinic.com/blog/${post.slug}`,
          image: post.feature_image || undefined,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: {
            name: post.primary_author?.name || 'Dion Hair Clinic',
            type: 'Person'
          },
          publisher: {
            name: 'Dion Hair Clinic',
            logo: 'https://www.dionhairclinic.com/images/DionHairClinic_Logo.svg',
            url: 'https://www.dionhairclinic.com'
          },
          articleBody: post.html,
          keywords: post.tags?.map(tag => tag.name)
        }}
      />

      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-[#7BA7C2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Blog
          </Link>
        </div>
      </div>

      {/* Hero with Featured Image */}
      {post.feature_image && (
        <section className="relative h-96 overflow-hidden">
          <img 
            src={post.feature_image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag.id}
                      className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                {post.primary_author && (
                  <div className="flex items-center gap-2">
                    {post.primary_author.profile_image && (
                      <img 
                        src={post.primary_author.profile_image} 
                        alt={post.primary_author.name}
                        className="w-8 h-8 rounded-full border-2 border-white/50"
                      />
                    )}
                    <span>{post.primary_author.name}</span>
                  </div>
                )}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time} Min. Lesezeit</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Share Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={sharePost}
              className="flex items-center gap-2 text-gray-600 hover:text-[#7BA7C2] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Teilen</span>
            </button>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none
                       prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                       prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
                       prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-[#7BA7C2] prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-gray-800 prose-strong:font-semibold
                       prose-ul:my-6 prose-ol:my-6
                       prose-li:text-gray-600 prose-li:mb-2
                       prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                       prose-blockquote:border-l-4 prose-blockquote:border-[#7BA7C2] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                       prose-code:text-[#7BA7C2] prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag.id}
                    to={`/blog/tag/${tag.slug}`}
                    className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-[#7BA7C2]/10 hover:text-[#7BA7C2] transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.primary_author && post.primary_author.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4">
                {post.primary_author.profile_image && (
                  <img 
                    src={post.primary_author.profile_image} 
                    alt={post.primary_author.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {post.primary_author.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.primary_author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Ähnliche Artikel
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Ihre Haartransplantation?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Vereinbaren Sie jetzt eine kostenlose Beratung mit unseren Experten
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-white text-[#7BA7C2] px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Kostenlose Beratung vereinbaren
          </a>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
