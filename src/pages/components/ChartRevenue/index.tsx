import { Line } from '@ant-design/plots';
import { DatePicker, Flex, Typography } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const { Title } = Typography;
interface Props {
  setFromDate: (fromDate: string) => void;
  setToDate: (toDate: string) => void;
  data: API.RevenueChart[];
  fromDate: string;
  toDate: string;
}
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const ChartRevenue: React.FC<Props> = ({ setFromDate, setToDate, data, fromDate, toDate }) => {
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
  };

  const [dates, setDates] = useState<RangeValue>(null);
  const onChange = (value: RangePickerProps['value'], dateString: [string, string]) => {
    console.log('Formatted Selected Time: ', dateString);
    setFromDate(dateString[0]);
    setToDate(dateString[1]);
  };
  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current >= dayjs().endOf('day') && current > dayjs();
  // };
  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 90;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 90;
    return current >= dayjs().endOf('day') || !!tooEarly;
  };

  return (
    <>
      <Flex align="center" style={{ marginBottom: '24px' }} gap={16}>
        <Title style={{ marginBottom: '0' }} level={5}>
          Revenue Chart
        </Title>
        <RangePicker
          onChange={onChange}
          onOpenChange={onOpenChange}
          disabledDate={disabledDate}
          onCalendarChange={(val) => {
            setDates(val);
          }}
        />
      </Flex>
      <Line {...config} />
    </>
  );
};

export default ChartRevenue;
