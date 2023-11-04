import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {
  SystemVehicleTypeControllerCreateModel,
  SystemVehicleTypeControllerDeleteModelById,
  SystemVehicleTypeControllerGetInfoList,
  SystemVehicleTypeControllerUpdateModel,
} from '@/services/api/SystemVehicleTypeController';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, Modal, Space, Tag, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import ModalVehicleType from './components/ModalVehicleType';
import './style.less';

const ManageVehicleType: React.FC = () => {
  const intl = useIntl();
  const [isOpenModalVehicleType, setIsOpenModalVehicleType] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [vehicleTypeSelect, setVehicleTypeSelect] = useState<API.VehicleTypeInfo | undefined>();

  const [form] = Form.useForm();

  const handleAddVehicleType = async (data: API.VehicleTypeDetailsCreate) => {
    const res = await SystemVehicleTypeControllerCreateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Add Vehicle Type Success',
      });
      setIsReload(!isReload);
      setIsOpenModalVehicleType(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleUpdateVehicleType = async (data: API.VehicleTypeDetailsUpdate) => {
    const res = await SystemVehicleTypeControllerUpdateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Update Vehicle Type Success',
      });
      setIsReload(!isReload);
      setIsOpenModalVehicleType(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleDeleteVehicleType = async (groupId: number) => {
    const res = await SystemVehicleTypeControllerDeleteModelById({ id: groupId });
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Delete Group Success',
      });
      setIsReload(!isReload);
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const columns: ProColumns<API.VehicleTypeInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      search: false,
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      search: false,
      align: 'center',
    },
    {
      title: 'Total Slot',
      dataIndex: 'totalSlot',
      search: false,
      align: 'center',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      search: false,
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%', textAlign: 'center' }}
              color={record.active ? 'success' : 'orange-inverse'}
            >
              {record.active ? 'ACTIVE' : 'INACTIVE'}
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
                setIsOpenModalVehicleType(true);
                setVehicleTypeSelect(row);
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
                    handleDeleteVehicleType(Number(row.id) || -1);
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
            name: 'Manage Vehicle Type',
            path: '',
          },
        ]}
      />
      <Button
        size="middle"
        type="primary"
        style={{ maxWidth: '18%', float: 'right' }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsOpenModalVehicleType(true);
          form.resetFields();
        }}
      >
        Add Vehicle Type
      </Button>
      <ProTable<API.VehicleTypeInfo, { isReload: boolean }>
        params={{ isReload }}
        headerTitle="Manage Groups Permission"
        options={{ search: false }}
        expandable={{ showExpandColumn: false }}
        rowKey="key"
        search={false}
        toolBarRender={false}
        request={async () => {
          const response = await SystemVehicleTypeControllerGetInfoList();
          return {
            data: response.data?.sort((a, b) => a?.id - b?.id),
          };
        }}
        columns={columns}
        pagination={false}
        // pagination={{
        //   showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
        //   pageSize: 20,
        // }}
      />
      <ModalVehicleType
        vehicleType={vehicleTypeSelect}
        form={form}
        isOpen={isOpenModalVehicleType}
        setIsOpen={setIsOpenModalVehicleType}
        handleCancel={() => {
          setIsOpenModalVehicleType(false);
          setVehicleTypeSelect(undefined);
        }}
        handleOk={() => {
          form.validateFields().then((data) => {
            if (vehicleTypeSelect) {
              handleUpdateVehicleType({
                id: vehicleTypeSelect.id,
                ...data,
              });
            } else {
              handleAddVehicleType(data as API.VehicleTypeDetailsCreate);
            }
          });
        }}
      />
    </>
  );
};

export default ManageVehicleType;
