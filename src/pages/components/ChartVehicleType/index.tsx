import { Column } from '@ant-design/plots';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
interface Props {
  data: API.VehicleChart[];
}

const ChartVehicleType: React.FC<Props> = ({ data }) => {
  const config = {
    data,
    xField: 'vehicleName',
    yField: 'amount',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      vehicleName: {
        alias: 'Vehicle Name',
      },
      amount: {
        alias: 'Amount',
      },
    },
    minColumnWidth: 120,
    maxColumnWidth: 120,
  };
  return (
    <>
      <Title style={{ marginBottom: '24px' }} level={5}>
        Vehicle Type Chart
      </Title>
      <Column {...config} />
    </>
  );
};

export default ChartVehicleType;
