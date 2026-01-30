
export default function Pagination({ firstIndex, lastIndex, currentPage, handleCurrentPage, totalPages, totalPosts, }){

  const handlePrev = () => {
    currentPage === 1 ? handleCurrentPage(totalPages) : handleCurrentPage(prev => prev - 1);
   
  }

  const handleNext = () => {
  currentPage === totalPages ? handleCurrentPage(1) : handleCurrentPage( prev => prev + 1);
  }
  return(
    <div className="pagination">
      <p>Showing {firstIndex + 1} - {Math.min(lastIndex, totalPosts)} of {totalPosts} results</p>
      <div className="btns">
        <button className="px-3 py-1 border rounded" onClick={handlePrev}>Prev</button>
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handleCurrentPage(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-black"}`}
            >{page}</button>
          ))}
          <button className="px-3 py-1 border rounded" onClick={handleNext}>Next</button>
      </div>
         
    </div>
  );
}