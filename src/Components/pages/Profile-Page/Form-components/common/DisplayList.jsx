import { MdDelete, MdEdit } from 'react-icons/md';

const DisplayList = ({
  title,
  subtitle,
  startDate,
  endDate,
  onEdit,
  onDelete,
  image,
}) => {
  return (
 <div className="relative group bg-white/80 border border-purple-100 backdrop-blur-md p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 my-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-purple-200">
  {/* Animated Logo Container */}
  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl flex items-center justify-center shadow-inner transform group-hover:rotate-6 transition-transform duration-300">
    <img
      src= {image}
      alt="company logo"
      className="w-10 h-10 object-contain"
    />
  </div>

  {/* Content */}
  <div className="flex-1 text-black min-w-0">
    <h3 className="text-base font-semibold leading-snug bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
      {title} at {subtitle}
    </h3>
    <p className="text-sm text-gray-500 mt-1 italic">
      {startDate} – {endDate}
    </p>
  </div>

  {/* Actions */}
  <div className="flex items-center gap-3">
    <button
      onClick={onEdit}
      className="p-2 rounded-full bg-purple-500 hover:bg-green-500 text-white shadow-md transition-all duration-300 hover:rotate-12"
    >
      <MdEdit size={18} />
    </button>
    <button
      onClick={onDelete}
      className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition-all duration-300 hover:scale-110"
    >
      <MdDelete size={18} />
    </button>
  </div>
</div>

  );
};

export default DisplayList;
