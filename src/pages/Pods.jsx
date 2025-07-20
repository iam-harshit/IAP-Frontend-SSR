
import { Routes, Route} from 'react-router-dom';
import PodsHomePage from '@/Components/pages/Pods-Page/PodsHomePage';
import PodThread from '@/Components/pages/Pods-Page/PodThread';
import SidePods from '@/Components/pages/Pods-Page/SidePods';

const Pods = () => {


  return (
    <div className="lg:bg-[#EFEFEF] w-full lg:min-h-screen lg:flex lg:flex-col">
      {/* Homepage Route */}
      <Routes>
        <Route path="" element={<PodsHomePage />} />
        <Route
          path=":podName"
          element={
            <div className="lg:flex lg:flex-row lg:items-start lg:gap-4 lg:px-6 2xl:mx-auto">
              <PodThread />
              <SidePods />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Pods;
