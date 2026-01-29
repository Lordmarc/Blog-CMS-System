
export default function Section() {

  return(
    <div className="section">
      <div className="flex w-full justify-between">
        <div className="">
          <h3 className="text-2xl font-semibold">Latest Articles</h3>
          <p className="text-gray-500">Fleshly baked insights from the development world</p>
        </div>
        <label htmlFor="filter">
          Filter by: 
          <select name="filter" id="" className="ml-2 w-24">
            <option value="Recent">Recent</option>
          </select>
        </label>
      </div>
      
    </div>
  );
}