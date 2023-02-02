const xhr = new XMLHttpRequest();
xhr.open("GET", 'data.json', true)
xhr.send();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    const data = JSON.parse(this.responseText)
    day = data.day_amount.map(function(elem){
      return elem.day;
    })
    amount = data.day_amount.map(function(elem){
      return elem.amount;
    })

    const ctx = document.getElementById('spent__bar');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: day,
        datasets: [{
          data: amount,
          backgroundColor: ["hsl(10, 79%, 65%)",
          "hsl(10, 79%, 65%)",
          "hsl(186, 34%, 60%)",
          "hsl(10, 79%, 65%)",
          "hsl(10, 79%, 65%)",
          "hsl(10, 79%, 65%)",
          "hsl(10, 79%, 65%)"],
          hoverBackgroundColor: [
            'hsl(10, 100%, 76%)',
            'hsl(10, 100%, 76%)',
            'hsl(187, 49%, 80%)',
            'hsl(10, 100%, 76%)',
            'hsl(10, 100%, 76%)',
            'hsl(10, 100%, 76%)'
        ],
          borderWidth: 1,
          borderRadius: "4"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            displayColors: false,
            padding: 10,
            position: 'nearest',
            backgroundColor: 'hsl(25, 47%, 15%)',
            bodyFont: {
              size: 16,
              weight: 'bold',
            },
            callbacks: {
              title: () => null,
              label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            }
            }
        },
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: "hsl(28, 10%, 53%)",
              font: {
                size: 14 
              },
              stepSize: 1,
              beginAtZero: true
            }
          },
          y: {
            beginAtZero: true,
            display: false,
          }
        }
      }
  });
  }
}
