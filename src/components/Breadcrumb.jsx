import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb(){
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return(
    <nav className="text-sm text-gray-500 flex items-center my-4">

      <Link to="/" className="hover:underline">
      Home
      </Link>

      {paths.map((path, index) => {
        const route = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;

        return (
          <span  key={index} className="flex items-center">
            <span className="mx-2">/</span>

            {isLast ? ( 
              <span>{path}</span>
            ) : (
              <Link to={route} className="hover:underline capitalize">
                {path}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  );
}