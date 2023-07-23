import ReactPaginate from "react-paginate";


const Pagination = ({handlePageClick, pageCount}) => {

  return (
    <div className="px-4">
      <ReactPaginate  className="react-paginate text-purple-950 flex justify-center mx-4 mb-8 bg-gradient-to-r from-white via-purple-200 to-white"
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
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

// const Pagination = ({ postsPerPage, totalPosts, paginate, setCurrentPage }) => {

//   const pageNumbers = [];

//   const prevPage = () => setCurrentPage( prev => prev - 1)
//   const nextPage = () => setCurrentPage( prev =>  prev + 1)

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="px-4">
//       <ul className=" text-purple-950 flex justify-center px-4 py-2 mb-8 bg-gradient-to-r from-white via-purple-200 to-white">
//         <li className="mx-2"><button onClick={prevPage}>&lt;</button></li>
//         {pageNumbers.map((number) => (
//           <li key={number} className="mx-2">
//             <a href="#" onClick={() => paginate(number)}>{number}</a>
//           </li>
//         ))}
//         <li className="mx-2"><button onClick={nextPage}>&gt;</button></li>
//       </ul>      
//     </div>
//   );
// };

// export default Pagination;
