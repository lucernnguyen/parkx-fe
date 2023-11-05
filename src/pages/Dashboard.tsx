import {
  SystemStatisticControllerParkingSessionByTodayAndCurrentMonthCard,
  SystemStatisticControllerRevenueByDateChart,
  SystemStatisticControllerRevenueByTodayAndCurrentMonthCard,
  SystemStatisticControllerVehicleAmountByTypeChart,
} from '@/services/api/SystemStatisticController';
import { Card, Col, Flex, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaMoneyBillAlt, FaSignOutAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import ChartRevenue from './components/ChartRevenue';
import ChartVehicleType from './components/ChartVehicleType';

const Welcome: React.FC = () => {
  const [vehicleSession, setVehicleSession] = useState<API.ParkingSessionByTodayAndCurrentMonth>();
  const [revenue, setRevenue] = useState<API.RevenueByTodayAndCurrentMonth>();
  const [vehicleData, setVehicleData] = useState<API.VehicleChart[]>([]);

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [revenueData, setRevenueData] = useState<API.RevenueChart[]>([]);

  const getAllDataDashboard = async () => {
    const vehicleSessionRes =
      await SystemStatisticControllerParkingSessionByTodayAndCurrentMonthCard();
    if (vehicleSessionRes.success) {
      setVehicleSession(vehicleSessionRes.data);
    }
    const revenueRes = await SystemStatisticControllerRevenueByTodayAndCurrentMonthCard();
    if (revenueRes.success) {
      setRevenue(revenueRes.data);
    }
    const vehicleDataRes = await SystemStatisticControllerVehicleAmountByTypeChart();
    if (vehicleDataRes.success) {
      setVehicleData(vehicleDataRes.data || []);
    }
  };
  const getRevenueChart = async () => {
    const res = await SystemStatisticControllerRevenueByDateChart({
      request: {
        from: fromDate,
        to: toDate,
      },
    });
    if (res.success) {
      setRevenueData(res.data || []);
    }
  };
  useEffect(() => {
    getAllDataDashboard();
  }, []);
  useEffect(() => {
    getRevenueChart();
  }, [fromDate, toDate]);
  return (
    <Flex style={{ flexDirection: 'column', gap: '32px 0' }}>
      <Row gutter={24} style={{ gap: '12px 0px' }}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Checkin/Day"
              value={vehicleSession?.today?.checkedIn}
              valueStyle={{ color: '#3f8600' }}
              prefix={<FaMapLocationDot />}
              suffix="Vehicles"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Checkout/Day"
              value={vehicleSession?.today?.checkedOut}
              valueStyle={{ color: '#cf1322' }}
              prefix={<FaSignOutAlt />}
              suffix="Vehicles"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Revenue/Day"
              value={revenue?.today}
              precision={2}
              valueStyle={{ color: '#364dc7' }}
              prefix={<FaMoneyBillAlt />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Checkin/Month"
              value={vehicleSession?.currentMonth?.checkedIn}
              valueStyle={{ color: '#3f8600' }}
              prefix={<FaMapLocationDot />}
              suffix="Vehicles"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Checkout/month"
              value={vehicleSession?.currentMonth?.checkedOut}
              valueStyle={{ color: '#cf1322' }}
              prefix={<FaSignOutAlt />}
              suffix="Vehicles"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Revenue/Month"
              value={revenue?.currentMonth}
              precision={2}
              valueStyle={{ color: '#364dc7' }}
              prefix={<FaMoneyBillAlt />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ gap: '64px 0px' }}>
        <Col span={24}>
          <ChartVehicleType data={vehicleData} />
        </Col>
        <Col span={24}>
          <ChartRevenue setFromDate={setFromDate} setToDate={setToDate} data={revenueData} />
        </Col>
      </Row>
    </Flex>
  );
};

export default Welcome;
