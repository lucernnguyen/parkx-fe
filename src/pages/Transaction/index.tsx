import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { SystemTransactionControllerGetInfoPageWithFilter } from '@/services/api/SystemTransactionController';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Input, Space, Tag, message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import './style.less';

const { RangePicker } = DatePicker;
const ManageTransaction: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState<boolean>(false);

  const columns: ProColumns<API.TransactionInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
      align: 'center',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      align: 'center',
      renderFormItem: () => <Input placeholder="Email" />,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      search: false,
      align: 'center',
      render: (_, row) => {
        return <>{row.balance?.toLocaleString()} VNĐ</>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      search: false,
      align: 'center',
      render: (_, row) => {
        return <>{row.amount?.toLocaleString()} VNĐ</>;
      },
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      search: false,
      align: 'center',
      render: (_, record) => {
        if (record.transactionType === 'PAYMENT') {
          return (
            <Space>
              <Tag style={{ width: '130%', textAlign: 'center' }} color={'error'}>
                {record.transactionType}
              </Tag>
            </Space>
          );
        }
        return (
          <Space>
            <Tag style={{ width: '130%', textAlign: 'center' }} color={'default'}>
              {record.transactionType}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      search: false,
      align: 'center',
      render: (_, record) => {
        if (record.status === 'SUCCESS') {
          return (
            <Space>
              <Tag style={{ width: '130%', textAlign: 'center' }} color={'success'}>
                {record.status}
              </Tag>
            </Space>
          );
        }
        if (record.status === 'PENDING') {
          return (
            <Space>
              <Tag style={{ width: '130%', textAlign: 'center' }} color={'processing'}>
                {record.status}
              </Tag>
            </Space>
          );
        }
        return (
          <Space>
            <Tag style={{ width: '130%', textAlign: 'center' }} color={'error'}>
              {record.status}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: 'Created Date',
      key: 'createdDate',
      dataIndex: 'createdDate',
      valueType: 'date',
      align: 'center',
      renderFormItem: () => (
        <RangePicker
          allowEmpty={[true, true]}
          placeholder={['Từ ngày', 'Đến ngày']}
          format={['DD/MM/YYYY']}
        />
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   render: (text, row) => [
    //     <div className="actions">
    //       <Tooltip title={'View'}>
    //         <div
    //           className="icon-edit"
    //           onClick={() => {
    //             history.push(`/manage-transactions/detail/${row?.id}`);
    //           }}
    //         >
    //           <EyeOutlined />
    //         </div>
    //       </Tooltip>
    //     </div>,
    //   ],
    // },
  ];

  return (
    <>
      {contextHolder}
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Home',
            path: '/dashboard',
          },
          {
            name: 'Manage Transaction',
            path: '',
          },
        ]}
      />

      <ProTable<
        API.TransactionInfo,
        API.SystemTransactionControllerGetInfoPageWithFilterParams & { isReload: boolean }
      >
        params={{ isReload }}
        headerTitle="Manage Transactions"
        options={{ search: true }}
        expandable={{ showExpandColumn: true }}
        search={{
          optionRender: (searchConfig) => [
            <Button
              type="primary"
              onClick={() => {
                searchConfig.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              Tìm Kiếm
            </Button>,
          ],
          layout: 'vertical',
          span: 6,
          labelWidth: 'auto',
        }}
        rowKey="key"
        toolBarRender={false}
        request={async (params) => {
          const [fromDate, toDate] = params['createdDate'] || [];
          const response = await SystemTransactionControllerGetInfoPageWithFilter({
            startDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            endDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            email: params.email,
            number: params.number,
            size: params.size,
          });
          return {
            data: response.data?.content,
            total: response.data?.totalElements,
          };
        }}
        columns={columns}
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: 20,
        }}
      />
    </>
  );
};

export default ManageTransaction;
