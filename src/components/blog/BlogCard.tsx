import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { GhostPost } from '../../services/ghostApi';

interface BlogCardProps {
  post: GhostPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Featured Image */}
      {post.feature_image && (
        <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
          <img 
            src={post.feature_image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {post.featured && (
            <div className="absolute top-4 right-4 bg-[#7BA7C2] text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
        </Link>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map(tag => (
              <Link
                key={tag.id}
                to={`/blog/tag/${tag.slug}`}
                className="text-xs px-3 py-1 bg-[#7BA7C2]/10 text-[#7BA7C2] rounded-full hover:bg-[#7BA7C2]/20 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#7BA7C2] transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {post.excerpt || post.custom_excerpt}
        </p>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} Min.</span>
            </div>
          </div>
        </div>
        
        {/* Author */}
        {post.primary_author && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            {post.primary_author.profile_image && (
              <img 
                src={post.primary_author.profile_image} 
                alt={post.primary_author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">{post.primary_author.name}</span>
          </div>
        )}
        
        {/* Read More Button */}
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-[#7BA7C2] hover:text-[#5A8BA6] font-medium transition-colors group"
        >
          Weiterlesen
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
