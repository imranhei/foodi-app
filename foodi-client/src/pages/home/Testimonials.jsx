import React from "react";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  return (
    <div className="section-container my-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">TESTIMINIALS</p>
            <h3 className="title">What Our Customers Say About Us</h3>
            <blockquote className="my-5 text-secondary leading-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatum nisi quos expedita hic iusto voluptas maiores suscipit
              aspernatur debitis, nostrum enim, distinctio voluptate? Ipsum
              accusantium,
            </blockquote>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text[#807E7E]">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
