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

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  data: number[];
  backgroundColor: string[];
}

interface IncomesCategoriesChartProps {
  formattedDate: string;
}
export const IncomesCategoriesChart = observer(
  ({ formattedDate }: IncomesCategoriesChartProps) => {
    const { reviewStore, incomesCategoriesStore } = useStores();
    const [data, setData] = useState<ChartData>({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [''],
        },
      ],
    });

    const findCategoryName = (categoryId: string) => {
      const categoryName = incomesCategoriesStore.categories.find(
        (category) => category._id === categoryId
      );
      if (!categoryName) return "Ошибка, не удалось найти";
      return categoryName.name;
    };
    useEffect(() => {
      incomesCategoriesStore.GetCategoriesAction();
    }, [incomesCategoriesStore]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await reviewStore.GetStatsIncomes({ date: formattedDate });
          const labels = reviewStore.statsIncomes?.map((income) =>
            findCategoryName(income._id)
          );
          const values = reviewStore.statsIncomes?.map(
            (income) => income.actions
          );

          setData({
            labels: labels,
            datasets: [
              {
                data: values,
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

    return reviewStore.statsIncomes[0] ? <Doughnut data={data} /> : null;
  }
);
