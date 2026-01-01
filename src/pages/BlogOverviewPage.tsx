import React, { useEffect, useState } from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';
import { getBlogPosts, GhostPost } from '../services/ghostApi';
import BlogCard from '../components/blog/BlogCard';
import SEO from '../components/seo/SEO';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const BlogOverviewPage: React.FC = () => {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getBlogPosts(12);
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Fehler beim Laden der Blog-Beiträge. Bitte versuchen Sie es später erneut.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Blog - Dion Hair Clinic | Wissenswertes über Haartransplantation"
        description="Aktuelle Artikel, Tipps und Wissenswertes rund um Haartransplantation, Haarpflege und Haargesundheit von den Experten der Dion Hair Clinic."
        keywords="Haartransplantation Blog, Haarpflege Tipps, Haarausfall Informationen, FUE Methode, DHI Technik"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <BookOpen className="w-5 h-5 text-[#7BA7C2] mr-2" />
            <span className="text-sm font-medium text-gray-700">Wissen & Expertise</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 leading-tight tracking-wide md:tracking-widest">
            Blog & <span className="text-[#7BA7C2]">Wissenswertes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Aktuelle Artikel, Tipps und Informationen rund um Haartransplantation, 
            Haarpflege und Haargesundheit von unseren Experten
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#7BA7C2] text-white px-6 py-2 rounded-xl hover:bg-[#5A8BA6] transition-colors"
                >
                  Erneut versuchen
                </button>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Noch keine Beiträge verfügbar
              </h3>
              <p className="text-gray-600">
                Schauen Sie bald wieder vorbei für neue Artikel und Informationen.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {posts.some(post => post.featured) && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-[#7BA7C2]" />
                    <h2 className="text-2xl font-bold text-gray-800">Featured Artikel</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts
                      .filter(post => post.featured)
                      .slice(0, 3)
                      .map(post => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More Button (for future pagination) */}
              {posts.length >= 12 && (
                <div className="text-center mt-12">
                  <button className="bg-[#7BA7C2] text-white px-8 py-3 rounded-xl hover:bg-[#5A8BA6] transition-colors font-medium">
                    Mehr Artikel laden
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Haben Sie Fragen zur Haartransplantation?
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

export default BlogOverviewPage;
