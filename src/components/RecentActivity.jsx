import { useContext, useState } from "react";
import { LogsContext } from "../logs/LogsProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function RecentActivity(){
      const {state} = useContext(LogsContext);
      const [visibleCount, setVisibleCount] = useState(5);
      const [toggle, setToggle] = useState(false);
      const viewAll = () => {
        if (toggle){
          setVisibleCount(5);
        }else{
          setVisibleCount(state.activity.length);
        }
        setToggle(!toggle);
      }

      const visibleLogs = state.activity.slice(0,visibleCount);
  return(
    <div className="recent-activity">
      <h2 className="mb-4 text-2xl font-semibold">Recent Activity</h2>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow rounded-md border border-gray-300">
          <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                  <tr>
                      <th scope="col" >
                          ACTIVITY
                      </th>
                      <th scope="col" >
                          TYPE
                      </th>
                      <th scope="col" >
                          STATUS
                      </th>
                      <th scope="col" >
                          TIME
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-white overflow-y-auto">
                {visibleLogs.map(log => (
                  <tr key={log.id} className="">
                    <td>
                      <div>
                        <p className="text-xl">{log.description}</p>
                        <p className="text-gray-500">{log.user.name}</p>
                      </div>
                    </td>
                    <td >
                      <div className="flex items-center h-full">
                          <p className="bg-gray-300 rounded-full text-xs flex items-center justify-center px-3 py-[2px]  font-semibold text-gray-600">{log.type}</p>
                      </div>

                    </td>                    
                    <td>
                      <div className="flex items-center h-full">
                          <p className={`rounded-full text-xs flex items-center justify-center px-3 py-[2px]  font-semibold ${
                            log.action === "Published" ? 'bg-green-200 text-green-600' : 'bg-gray-300 text-gray-600'
                          }`}>{log.action}</p>
                      </div>
                    </td>
                    <td className="text-gray-500 font-semibold">{dayjs(log.created_at).fromNow()}</td>
                  </tr>
                ))}
              </tbody>
          </table>
          {state.activity  ? (<button className="w-full bg-white border-t border-gray-300 py-4 text-[#001BB7] font-bold" onClick={viewAll}>{toggle ? 'Show Less' : 'View All Activity'}</button>
          ) : (<p>No activity yet.</p>) }
            </div> 
    </div>
  );
}