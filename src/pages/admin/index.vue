<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const stats = [
  { name: 'Всего заказов', stat: '134' },
  { name: 'Общая выручка', stat: '34.145р.' },
  { name: 'Среднее за день', stat: '2.334р.' },
]

const daysChart = {
  series: [
    {
      name: 'Всего',
      data: [13, 6, 7, 8, 15, 14, 13],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#fb802f'],
    xaxis: {
      type: 'integer',
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб', 'Вс'],
      labels: {
        show: true,
        hideOverlappingLabels: false,
        showDuplicates: true,
        trim: false,
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        show: true,
        align: 'right',
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return `Дата ${val}`
        },
      },
      y: {
        formatter: function (val) {
          return `${val} заказов`
        },
      },
    },
  },
}
const productsChart = {
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    stroke: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          expandOnClick: false, // Отключает изменение размера сектора при клике
        },
      },
    },
    legend: {
      show: true,
      fontSize: '20px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      markers: {
        width: 20,
        height: 20,
        offsetX: -10,
        offsetY: 0,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    labels: [
      'Комбо Взрыв вкусов',
      'Комбо Волшебный сад',
      'Сет Райский аромат',
      'Сет калифорния',
      'Сет Императорский выбор',
    ],
    colors: ['#38bdf8', '#fbbf24', '#fb923c', '#f87171', '#64748b'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 400,
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div>
      <h3 class="text-2xl leading-6 font-medium text-gray-900">Последние 30 дней</h3>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="item in stats"
          :key="item.name"
          class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            {{ item.name }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ item.stat }}
          </dd>
        </div>
      </dl>
    </div>

    <section class="pt-6">
      <div class="container mx-auto">
        <div class="bg-white rounded">
          <div class="flex flex-wrap items-center py-5">
            <h3 class="text-2xl leading-6 font-medium text-gray-900">
              Статистика по заказам за текущую неделю
            </h3>
          </div>
          <ClientOnly>
            <VueApexCharts
              type="bar"
              :options="daysChart.options"
              :series="daysChart.series"
              height="200"
            />
          </ClientOnly>
        </div>
      </div>
    </section>

    <div class="flex xl:grid xl:grid-cols-2 w-full">
      <section class="pt-6 w-full">
        <div class="container mx-auto">
          <div class="bg-white rounded">
            <div class="flex flex-wrap items-center py-5">
              <h3 class="text-2xl leading-6 font-medium text-gray-900">
                Самые популярные продукты за 30 дней
              </h3>
            </div>
            <ClientOnly>
              <VueApexCharts
                type="pie"
                :options="productsChart.options"
                :series="productsChart.series"
                height="300"
              />
            </ClientOnly>
            <div class="chart p-6" data-type="columns"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
