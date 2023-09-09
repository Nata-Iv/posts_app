import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick, pageCount, page }) => {
  return (
    <div className="px-4">
      <ReactPaginate
        className="react-paginate text-purple-950 flex justify-center mx-4 mb-8 bg-gradient-to-r from-white via-purple-200 to-white"
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        initialPage={page - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
