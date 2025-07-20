import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const SidebarFilters = ({ openModal }) => {
    const [skillsToShow, setSkillsToShow] = useState(5);
    const [titlesToShow, setTitlesToShow] = useState(5);
    const [companiesToShow, setCompaniesToShow] = useState(5);
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => setShowFilters((prev) => !prev);

    const skills = [
        { name: 'Artificial Intelligence', count: 111 },
        { name: 'Machine Learning', count: 67 },
        { name: 'Leadership', count: 52 },
        { name: 'Data Science', count: 46 },
        { name: 'Product Management', count: 44 },
        { name: 'Career Growth', count: 42 },
    ];

    const jobTitles = [
        { name: 'Founder', count: 10 },
        { name: 'CTO', count: 6 },
        { name: 'Engineering Manager', count: 4 },
        { name: 'AI', count: 3 },
        { name: 'CEO', count: 3 },
        { name: 'Data Science', count: 3 },
    ];

    const companies = [
        { name: 'Meta', count: 4 },
        { name: 'Amazon', count: 3 },
        { name: 'Google', count: 3 },
        { name: 'Microsoft', count: 3 },
        { name: 'APTA Technologies', count: 1 },
        { name: 'Agile C-Level | IBM | Kyndryl', count: 1 },
    ];

    const FilterSection = ({ title, items, toShow, setToShow }) => (
        <div className="mb-6">
            <h4 className="font-semibold text-purple-800 mb-1 text-sm sm:text-base md:text-lg">{title}</h4>
            <input
                type="text"
                placeholder={`Search for ${title.toLowerCase()}`}
                className="w-full mb-3 p-2 text-xs sm:text-sm md:text-base border border-purple-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {items.slice(0, toShow).map((item, idx) => (
                <label
                    key={idx}
                    className="flex items-center justify-between text-gray-800 mb-2 hover:bg-purple-50 px-2 py-1 rounded transition text-xs sm:text-sm md:text-base"
                >
                    <span>
                        <input type="checkbox" className="accent-purple-600 mr-2" />
                        {item.name}
                    </span>
                    <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">{item.count}</span>
                </label>
            ))}
            {toShow < items.length && (
                <button
                    className="text-purple-600 text-[10px] sm:text-xs md:text-sm mt-1 hover:underline"
                    onClick={() => setToShow(items.length)}
                >
                    Show more
                </button>
            )}
        </div>
    );

    const renderFilterBody = () => (
        <>
            <FilterSection title="Skills" items={skills} toShow={skillsToShow} setToShow={setSkillsToShow} />
            <FilterSection title="Job Titles" items={jobTitles} toShow={titlesToShow} setToShow={setTitlesToShow} />
            <FilterSection title="Companies" items={companies} toShow={companiesToShow} setToShow={setCompaniesToShow} />
            <div className="flex flex-col gap-2 mt-4">
                <button onClick={openModal} className="border border-purple-300 text-purple-700 rounded-md py-2 text-xs font-semibold hover:bg-purple-50 transition">
                    More filters
                </button>
                <button className="border border-purple-600 text-white bg-purple-600 hover:bg-purple-700 rounded-md py-2 text-xs font-semibold transition">
                    💾 Save this search
                </button>
                <div className="flex items-center justify-center mt-3 cursor-pointer text-purple-600 text-sm hover:underline transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Reset all filters</span>
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full lg:w-80">
            {/* 🔍 Mobile Topbar */}
            <div className="lg:hidden flex items-center gap-2 mb-4 px-2">
                <input
                    type="text"
                    placeholder="Search by skill, title, or company"
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={toggleFilters} className="p-2 border border-purple-300 rounded-lg">
                    <SlidersHorizontal className="text-purple-600 w-5 h-5" />
                </button>
            </div>

            {/* 📦 Full Sidebar on Large Screen */}
            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-md text-sm transition-all hidden lg:block">
                <input
                    type="text"
                    placeholder="Search by skill, title, or company"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 shadow-sm mb-2"
                />
                <p className="text-gray-700 text-sm mb-8 font-medium">1,000+ mentors found</p>
                {renderFilterBody()}
            </div>

            {/* 📱 Responsive Filters */}
            {showFilters && (
                <div className="bg-white mt-3 p-4 rounded-xl border border-purple-100 shadow-md lg:hidden">
                    <p className="text-gray-700 text-sm mb-4 font-medium">1,000+ mentors found</p>
                    {renderFilterBody()}
                </div>
            )}
        </div>
    );
};

export default SidebarFilters;
