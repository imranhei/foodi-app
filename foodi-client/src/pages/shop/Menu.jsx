import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { FaFilter } from "react-icons/fa";

export default function Menu() {

  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  //load data
  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    //call fetch data
    fetchData();
  }, []);

  //filter items
  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //sorting based on A-Z, Z-A, and price
  const sortItems = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];
    
    switch(option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center gap-8">
          {/* text */}
          <div className="space-y-7 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug ">
              For the love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[4A4A4A] md:w-4/5 mx-auto">
              Where Each Plate Waves a Story of Culinary Mastery and Passinate
              Craftsmanship
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* All menu section */}
      <div className="section-container">
        {/* menu options and sorting field */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* menu options */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll} className={selectedCategory === "all" ? "active": ""}>All</button>
            <button className={selectedCategory === "salad" ? "active": ""} onClick={() => filterItems("salad")}>Salad</button>
            <button className={selectedCategory === "pizza" ? "active": ""}  onClick={() => filterItems("pizza")}>Pizza</button>
            <button className={selectedCategory === "soup" ? "active": ""}  onClick={() => filterItems("soup")}>Soups</button>
            <button className={selectedCategory === "dessert" ? "active": ""}  onClick={() => filterItems("dessert")}>Desserts</button>
            <button className={selectedCategory === "drinks" ? "active": ""}  onClick={() => filterItems("drinks")}>Drinks</button>
          </div>

          {/* sorting filter */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white"/>
            </div>
            <select
              name="sort"
              id="sort"
              value={sortOption}
              onChange={(e) => sortItems(e.target.value)}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* items card */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {
            currentItems.map((item) => (
              <Card key={item._id} item={item} />
            ))
          }
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center my-8">
        {
          Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) => (
            <button key={index+1} onClick={() => paginate(index + 1)} className={`mx-1 py-1 px-3 rounded-full  ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}>{index+1}</button>
          ))
        }
      </div>
    </div>
  );
}
