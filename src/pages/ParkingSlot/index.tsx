import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {
  SystemParkingSlotControllerCreateModel,
  SystemParkingSlotControllerDeleteModelById,
  SystemParkingSlotControllerGetInfoPageWithFilter,
  SystemParkingSlotControllerUpdateModel,
} from '@/services/api/SystemParkingSlotController';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, Modal, Space, Tag, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import ModalParkingSlot from './components/ModalParkingSlot';
import './style.less';

const ManageParkingSlot: React.FC = () => {
  const intl = useIntl();
  const [isOpenModalParkingSlot, setIsOpenModalParkingSlot] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [parkingSlotSelect, setParkingSlotSelect] = useState<API.ParkingSlotInfo | undefined>();

  const [form] = Form.useForm();

  const handleAddParkingSlot = async (data: API.ParkingSlotInfoCreate) => {
    const res = await SystemParkingSlotControllerCreateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Add Parking Slot Success',
      });
      setIsReload(!isReload);
      setIsOpenModalParkingSlot(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleUpdateParkingSlot = async (data: API.ParkingSlotInfoUpdate) => {
    const res = await SystemParkingSlotControllerUpdateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Update Parking Slot Success',
      });
      setIsReload(!isReload);
      setIsOpenModalParkingSlot(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleDeleteParkingSlot = async (groupId: string) => {
    const res = await SystemParkingSlotControllerDeleteModelById({ id: groupId });
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Delete Parking Slot Success',
      });
      setIsReload(!isReload);
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const columns: ProColumns<API.ParkingSlotInfo>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      search: false,
      align: 'center',
    },
    {
      title: 'RowIndex',
      dataIndex: 'rowIndex',
      search: false,
      align: 'center',
    },
    {
      title: 'ColumnIndex',
      dataIndex: 'columnIndex',
      search: false,
      align: 'center',
    },
    {
      title: 'Has Parking',
      dataIndex: 'hasParking',
      search: false,
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%', textAlign: 'center' }}
              color={record.hasParking ? 'success' : 'orange-inverse'}
            >
              {record.hasParking ? 'ACTIVE' : 'INACTIVE'}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: 'Action',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => [
        <div className="actions">
          <Tooltip title={'Edit'}>
            <div
              className="icon-edit"
              onClick={() => {
                setIsOpenModalParkingSlot(true);
                setParkingSlotSelect(row);
              }}
            >
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip title={'Remove'}>
            <div
              className="icon-reomve"
              onClick={() => {
                Modal.confirm({
                  title: <div>Confirm Remove Group</div>,
                  content: 'Are you sure to delete this Parking Slot?',
                  onOk: () => {
                    handleDeleteParkingSlot(row.id || '');
                  },
                });
              }}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
        </div>,
      ],
    },
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
            name: 'Manage Parking Slot',
            path: '',
          },
        ]}
      />
      <Button
        size="middle"
        type="primary"
        style={{ maxWidth: '20%', float: 'right' }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsOpenModalParkingSlot(true);
          form.resetFields();
        }}
      >
        Add Parking Slot
      </Button>
      <ProTable<
        API.ParkingSlotInfo,
        API.SystemParkingSlotControllerGetInfoPageWithFilterParams & { isReload: boolean }
      >
        params={{ isReload }}
        headerTitle="Manage Groups Permission"
        options={{ search: false }}
        expandable={{ showExpandColumn: false }}
        rowKey="key"
        search={false}
        toolBarRender={false}
        request={async (params) => {
          const response = await SystemParkingSlotControllerGetInfoPageWithFilter(params);
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
      <ModalParkingSlot
        parkingSlot={parkingSlotSelect}
        form={form}
        isOpen={isOpenModalParkingSlot}
        setIsOpen={setIsOpenModalParkingSlot}
        handleCancel={() => {
          setIsOpenModalParkingSlot(false);
          setParkingSlotSelect(undefined);
        }}
        handleOk={() => {
          form.validateFields().then((data) => {
            if (parkingSlotSelect) {
              handleUpdateParkingSlot({
                id: parkingSlotSelect.id,
                ...data,
              });
            } else {
              handleAddParkingSlot(data as API.ParkingSlotInfoCreate);
            }
          });
        }}
      />
    </>
  );
};

export default ManageParkingSlot;
