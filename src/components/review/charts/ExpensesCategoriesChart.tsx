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

interface ExpenseCategoriesChartProps {
  formattedDate: string;
}
export const ExpenseCategoriesChart = observer(
  ({ formattedDate }: ExpenseCategoriesChartProps) => {
    const { reviewStore, expensesCategoriesStore } = useStores();
    const [data, setData] = useState<ChartData>({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [""],
        },
      ],
    });

    const findCategoryName = (categoryId: string) => {
      const categoryName = expensesCategoriesStore.categories.find(
        (category) => category._id === categoryId
      );
      if (!categoryName) return "Ошибка, не удалось найти";
      return categoryName.name;
    };

    useEffect(() => {
      expensesCategoriesStore.GetCategoriesAction();
    }, [expensesCategoriesStore]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await reviewStore.GetStatsExpenses({ date: formattedDate });
          const labels = reviewStore.statsExpenses?.map((income) =>
            findCategoryName(income._id)
          );
          const values = reviewStore.statsExpenses?.map(
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

    return reviewStore.statsExpenses[0] ? (
      <S.ItemWrapper>
        <S.ChartTitle>Распределение расходов по категориям</S.ChartTitle>
        <S.ChartWrapper>
          <Doughnut data={data} />
        </S.ChartWrapper>
      </S.ItemWrapper>
    ) : null;
  }
);
