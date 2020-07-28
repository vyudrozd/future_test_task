import React from 'react';
import { loadSmallData, loadBigData } from '../scripts/dataLoaders';
import MainTable from '../components/MainTable';

export default function MainPageContainer() {
  return (
    <MainTable
      loadSmallData={loadSmallData}
      loadBigData={loadBigData}
    />
  );
}
