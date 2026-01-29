
export default function Card({ icon, value, title }){
  return (
    <div className="stats-card">
      <div className="text-lg text-gray-500 flex items-center w-full uppercase">
        <p>{title}</p>
        <div className="ml-auto">
          {icon}
        </div>
     
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}