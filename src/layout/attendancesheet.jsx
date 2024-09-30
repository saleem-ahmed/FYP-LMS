import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const AttendanceSheet = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("/attendance/attendance_log.txt")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        const data = lines.map((line) => line.split(","));
        setTableData(data);
      })
      .catch((error) => console.error("Error fetching TXT file:", error));
  }, []);

  return (
    <>
    <div>
        <h2 className="text-xl font-semibold sm:text-2xl text-center">Attendance Sheet</h2>
    </div>
      <div className="p-4">
        {tableData.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="w-full bg-gray-100">
                  <th className="px-4 py-2 border-b border-gray-200">Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Time Log
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="w-full even:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200 text-center">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-center">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-center">
                      P
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceSheet;
