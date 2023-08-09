import React from "react";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SalesReport = ({ allsalesReport }) => {
  const tableRef = useRef(null);

  const createPDFfromHTML = () => {
    const table = tableRef.current;
    if (table) {
      const HTML_Width = table.offsetWidth;
      const HTML_Height = table.offsetHeight;
      const top_left_margin = 15;
      const PDF_Width = HTML_Width + top_left_margin * 2;
      const PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
      const canvas_image_width = HTML_Width;
      const canvas_image_height = HTML_Height;
      const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      html2canvas(table).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          top_left_margin,
          canvas_image_width,
          canvas_image_height
        );

        for (let i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(
            imgData,
            "JPG",
            top_left_margin,
            -(PDF_Height * i) + top_left_margin * 4,
            canvas_image_width,
            canvas_image_height
          );
        }

        pdf.save("sales-report.pdf");
      });
    }
  };

  return (
    <div style={{ marginTop: "5rem" }} className="col py-3">
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <h3 className="text-md">Sales report</h3>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-between text-sm">
            {/* <a className="btn btn-primary" href="/admin/salesReport">
              All Bookings
            </a>
            <a className="btn btn-primary ms-2" href="/admin/dailyReport">
              Daily Bookings
            </a>
            <a className="btn btn-primary ms-2" href="/admin/monthlyReport">
              Monthly Bookings
            </a> */}
          </div>
          <button className="btn bg-green-800 px-2 py-2 text-xs rounded-lg text-white" onClick={createPDFfromHTML}>
            Download pdf
          </button>
        </div>
        <div className="sales table-responsive mt-5">
        <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Mail
            </th>
            <th scope="col" className="px-6 py-3">
              Booking_Id
            </th>
            <th scope="col" className="px-6 py-3">
              Booked Lounge
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status 
            </th>
           
           
          </tr>
        </thead>
        <tbody>
        {allsalesReport?.map((booking, index) => (
              <tr key={index} className="bg-white border-b cursor-pointer">
               
                
                <td className="px-6 py-4">{booking.user_id.email}</td>
                <td className="px-6 py-4">{booking._id}</td>
                <td className="px-6 py-4">{booking.lounge_id.loungeName}</td>
                <td className="px-6 py-4">{booking.amount_paid}</td>
                <td className="px-6 py-4">{booking.status}</td>
              </tr>
            ))||<span className="mt-5">No Data Available</span>}
         
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
