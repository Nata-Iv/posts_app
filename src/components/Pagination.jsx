import ReactPaginate from "react-paginate";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

const Pagination = ({handlePageClick, pageCount, page}) => {
  // const [page] = useQueryParam("page", withDefault(NumberParam, 1));
  // console.log(pageCount)
  return (
    <div className="px-4">
      <ReactPaginate  className="react-paginate text-purple-950 flex justify-center mx-4 mb-8 bg-gradient-to-r from-white via-purple-200 to-white"
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        initialPage={page-1}
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
