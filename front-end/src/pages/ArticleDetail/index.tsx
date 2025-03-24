import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import articleService, { Article } from '@/services/articleService';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) throw new Error('Article ID is required');
        const data = await articleService.getArticleById(parseInt(id));
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-gray-600 text-center">Không tìm thấy bài viết</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{article.title}</h1>
        <div className="text-gray-600 text-sm">
          {format(new Date(article.publishDate), 'dd/MM/yyyy HH:mm', { locale: vi })}
          {article.category && (
            <span className="ml-2">
              • {article.category.name}
            </span>
          )}
        </div>
      </div>

      {article.thumbnailUrl && (
        <div className="mb-6">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full max-h-[500px] object-contain"
          />
        </div>
      )}

      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticleDetail;