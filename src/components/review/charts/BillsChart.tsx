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

export const BillsChart = observer(() => {
  const { billsStore } = useStores();
  const [data, setData] = useState({
    labels: [""],
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
        await billsStore.GetBillsAction();
        setData({
          labels: billsStore.bills.map((item) => item.name),
          datasets: [
            {
              data: billsStore.bills.map((item) => item.value),
              backgroundColor: doughnutColors.colors,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [billsStore]);
  return billsStore.bills ? <Doughnut data={data} /> : null;
});
