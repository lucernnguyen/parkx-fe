import { Line } from '@ant-design/plots';
import { DatePicker, Flex, Typography } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import React from 'react';

const { RangePicker } = DatePicker;

const { Title } = Typography;
interface Props {
  setFromDate: (fromDate: string) => void;
  setToDate: (toDate: string) => void;
  data: API.RevenueChart[];
}
const ChartRevenue: React.FC<Props> = ({ setFromDate, setToDate, data }) => {
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };
  const onChange = (value: RangePickerProps['value'], dateString: [string, string]) => {
    console.log('Formatted Selected Time: ', dateString);
    setFromDate(dateString[0]);
    setToDate(dateString[1]);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current >= dayjs().endOf('day');
  };

  return (
    <>
      <Flex align="center" style={{ marginBottom: '24px' }} gap={16}>
        <Title style={{ marginBottom: '0' }} level={5}>
          Revenue Chart
        </Title>
        <RangePicker disabledDate={disabledDate} onChange={onChange} />
      </Flex>
      <Line {...config} />
    </>
  );
};

export default ChartRevenue;
