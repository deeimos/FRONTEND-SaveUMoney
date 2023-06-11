import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../StoresProvider";
import { S } from "../styled";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barColors } from "../../../const/colors";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

interface ChartData {
  labels: number[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface MonthActionsChartProps {
  formattedDate: string;
}
export const MonthActionsChart = observer(
  ({ formattedDate }: MonthActionsChartProps) => {
    const { reviewStore } = useStores();
    const [data, setData] = useState<ChartData>({
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "",
        },
        {
          label: "",
          data: [],
          backgroundColor: "",
        },
      ],
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          await reviewStore.GetTotals({ date: formattedDate });

          const [day, month, year] = formattedDate
            .split(".")
            .map((str) => parseInt(str)); // парсим день, месяц и год
          const daysInMonth = new Date(year, month, 0).getDate();

          let incomeForDaysOfMonth: number[] = new Array<number>(
            daysInMonth
          ).fill(0);
          let expensesForDaysOfMonth: number[] = new Array<number>(
            daysInMonth
          ).fill(0);

          if (reviewStore.totalIncomes?.actions)
            reviewStore.totalIncomes?.actions?.forEach((income) => {
              const dayOfMonth = new Date(income._id).getDate();
              if (dayOfMonth <= daysInMonth) {
                incomeForDaysOfMonth[dayOfMonth - 1] += income.value;
              }
            });

          if (reviewStore.totalExpenses?.actions)
            reviewStore.totalExpenses?.actions?.forEach((expense) => {
              const dayOfMonth = new Date(expense._id).getDate();
              if (dayOfMonth <= daysInMonth) {
                expensesForDaysOfMonth[dayOfMonth - 1] += expense.value;
              }
            });

          const labels: number[] = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
          );
          setData({
            labels: labels,
            datasets: [
              {
                label: "Расходы",
                data: expensesForDaysOfMonth as number[],
                backgroundColor: barColors.red,
              },
              {
                label: "Доходы",
                data: incomeForDaysOfMonth,
                backgroundColor: barColors.blue,
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [reviewStore, formattedDate]);

    return reviewStore.totalIncomes?.actions[0] ||
      reviewStore.totalExpenses?.actions[0] ? (
      <S.ItemWrapper className='everyday__chart'>
        <S.ChartTitle>Доходы / Расходы ежедневно</S.ChartTitle>
        <S.ChartWrapper className='everyday__chartWrapper'>
          <Bar
            data={data}
            options={{
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </S.ChartWrapper>
      </S.ItemWrapper>
    ) : null;
  }
);
