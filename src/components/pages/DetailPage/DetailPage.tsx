import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { filterAndSliceArticles } from '../../../utils/filterAndSliceArticles/filterAndSliceArticles';
import { timeElapsedSince } from '../../../utils/timeElapsed/timeElapsed';
import CategoryHeader from '../../atoms/CategoryHeader/Header';
import Loader from '../../atoms/Loader/Loader';
import Card from '../../molecules/Card/Card';
import CategoryComponent from '../../molecules/Category/Category';
import HeaderNavigationMenu from '../../organisms/Navigation/HeaderNavigationMenu';
import Pagination from '../../atoms/Pagination/Pagination'; // assuming you have a Pagination component

const DetailPage = () => {
  const location = useLocation();
  const { category }: any = location.state;
  const articlesPerPage = 5; // Number of articles per page

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedArticles = category.data
    ? filterAndSliceArticles(category.data, articlesPerPage * currentPage)
    : [];

  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = paginatedArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  return (
    <>
      {/* Navigation */}
      <HeaderNavigationMenu title={'React News App'} />
      
      {/* Category selection */}
      <CategoryComponent />
      
      {/* Articles list */}
      <div className='flex-container'>
        <div className='flex-item-left'>
          <CategoryHeader title={category.title} />
          {category.data ? (
            displayedArticles.map((article: any, index: number) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                description={article.content}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          ) : (
            <Loader />
          )}
          {/* Pagination */}
          {category.data && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                category.data.length / articlesPerPage
              )}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
