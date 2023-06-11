import React, { useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react-lite";
import { useStores } from "../../../StoresProvider";
import { IActionsTotal, IActionTotal } from "../../../const/types";
import { toFormattedDate } from "../../../utils/FormattedDate";
import { SComponents } from "../../styled";
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
import { Doughnut } from "react-chartjs-2";
import { doughnutColors } from "../../../const/colors";

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

interface TotalActionsChartProps {
  formattedDate: string;
}
export const TotalActionsChart = observer(
  ({ formattedDate }: TotalActionsChartProps) => {
    const { reviewStore } = useStores();
    const labels = ["Доходы", "Расходы"];
    const [data, setData] = useState({
      labels: labels,
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ["", ""],
        },
      ],
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          await reviewStore.GetTotals({ date: formattedDate });
          const totalIncome = reviewStore.totalIncomes?.total || 0;
          const totalExpense = reviewStore.totalExpenses?.total || 0;
          setData({
            labels: labels,
            datasets: [
              {
                data: [totalIncome, totalExpense],
                backgroundColor: doughnutColors.colors,
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [reviewStore, formattedDate]);
    return reviewStore.totalIncomes?.total ||
      reviewStore.totalExpenses?.total ? (
      <Doughnut data={data} />
    ) : null;
  }
);
