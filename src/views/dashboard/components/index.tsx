import { lazy } from 'react';

export const ChartData = lazy(() => import('./chart-data/chart-data.component'));
export const PieData = lazy(() => import('./pie-data/pie-data.component'));
export const SummaryData = lazy(() => import('./summary-data/summary-data.component'));
