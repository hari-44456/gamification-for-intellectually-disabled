import React from 'react';
import {Line} from 'react-chartjs-2';

export default function StudentInfo({ labels,scores }){
	const data = {
		labels,
		datasets: [
			{
				label: 'Scores',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: scores
			}
		]
	};

    return (
        <React.Fragment>
            <h2>Line Graph Average Score </h2>
            <Line data={data} />
        </React.Fragment>
    );
};
