import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';


Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip);

function LineChart({datas,title}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];

  console.log(datas);
  console.log(labels);

  const filteredData = labels?.map((label) => {
    const dataEntry = datas?.find((data) => data.month === label);
    const count = dataEntry ? dataEntry.count : 0;
    return  count;
  });
  console.log(filteredData);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'MAU',
        // data: labels.map(() => Math.random() * 100 + 500),
        data: filteredData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-black">{title}</h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;

