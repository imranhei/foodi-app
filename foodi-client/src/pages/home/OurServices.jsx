import React from 'react'

const serviceList =  [
  {id: 1, title: "Catering", des: "Delight your guests with our flavors and presentation.", image: "/images/home/services/icon1.png"},
  {id: 2, title: "Fast Delivery", des: "Delight your guests with our flavors and presentation.", image: "/images/home/services/icon2.png"},
  {id: 3, title: "Online Ordering", des: "Delight your guests with our flavors and presentation.", image: "/images/home/services/icon3.png"},
  {id: 4, title: "Gift Card", des: "Delight your guests with our flavors and presentation.", image: "/images/home/services/icon4.png"},
]

export default function OurServices() {
  return (
    <div className='section-container'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">OUR STORY & SERVICES</p>
            <h3 className="title">Our Culinary Journey And Services</h3>
            <blockquote className="my-5 text-secondary leading-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatum nisi quos expedita hic iusto voluptas maiores suscipit
              aspernatur debitis, nostrum enim, distinctio voluptate? Ipsum
              accusantium,
            </blockquote>
            <button className="btn bg-green px-8 text-white py-3 rounded-full">Explore</button>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
          {
            serviceList.map((service, index) => (
              <div key={index} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 border">
                <img src={service.image} alt={service.title} className="mx-auto w-16 h-16" />
                <div>
                  <h5 className="pt-3 font-semibold">{service.title}</h5>
                  <p className='text-black'>{service.des}</p>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
