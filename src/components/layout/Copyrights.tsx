function CopyRights() {
  

  return (
    <div className="bg-white">
    <div className="max-w-7xl mx-auto py-2 px-4 sm:px-2 lg:px-8 ">
       <div className="flex justify-between items-center">
         <p className="text-gray-500 text-sm">
           © {new Date().getFullYear()} Zunolabs private limited. All rights reserved.
         </p>
         <div className="flex space-x-6">
           <a href="#" className="text-gray-500 hover:text-gray-600">
             Privacy
           </a>
           <a href="#" className="text-gray-500 hover:text-gray-600">
             Terms
           </a>
         </div>
       </div>
     </div>
    </div>
  );
}

export default CopyRights;