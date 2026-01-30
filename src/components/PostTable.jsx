import Pagination from "./pagination";

export default function PostTable({ state, totalPosts, currentPosts, firstIndex, lastIndex, currentPage, handleCurrentPage,totalPages }){
  return(
    <div className="relative overflow-x-auto bg-white shadow rounded border border-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col">TITLE</th>
              <th scope="col">AUTHOR</th>
              <th scope="col">STATUS</th>
              <th scope="col">LAST UPDATED</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white overflow-y-auto">
            {currentPosts.map((item) => (
              <tr key={item.id}>
                <td>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <span className="text-gray-500">/blog/{item.slug}</span>
                </td>
                <td>
                  <p className="text-sm font-semibold text-gray-600">
                    {item.user?.name
                      ? item.user.name[0].toUpperCase() +
                        item.user.name.slice(1)
                      : ""}
                  </p>
                </td>
                <td>
                  <div className="flex">
                    <p
                      className={`px-2 w-auto rounded-full font-semibold text-xs ${item.status === "Published" ? "bg-green-100 text-green-500" : "bg-orange-100 text-orange-500"}`}
                    >
                      {item.status}
                    </p>
                  </div>
                </td>
                <td>N/A</td>
                <td>
                  <div>
                    <button></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       <Pagination  
          firstIndex={firstIndex} 
          lastIndex={lastIndex} 
          totalPosts={totalPosts} 
          currentPage={currentPage} 
          handleCurrentPage={handleCurrentPage} 
          totalPages={totalPages}
          />
      </div>
  );
}