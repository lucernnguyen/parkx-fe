import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {
  SystemUserControllerCreateModel,
  SystemUserControllerDeleteModelById,
  SystemUserControllerGetInfoPageWithFilter,
  SystemUserControllerUpdateModel,
} from '@/services/api/SystemUserController';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Avatar, Button, Form, Modal, Space, Tag, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import ModalUser from './components/ModalUser';
import './style.less';

const ManageUser: React.FC = () => {
  const [IsOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [userSelect, setUserSelect] = useState<API.UserInfo | undefined>();
  const [form] = Form.useForm();

  const handleAddUser = async (data: API.UserDetailsCreate) => {
    const res = await SystemUserControllerCreateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Add User Success',
      });
      setIsReload(!isReload);
      setIsOpenModalUser(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleUpdateUser = async (data: API.UserDetailsUpdate) => {
    const res = await SystemUserControllerUpdateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Update User Success',
      });
      setIsReload(!isReload);
      setIsOpenModalUser(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const res = await SystemUserControllerDeleteModelById({ id: userId });
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Delete User Success',
      });
      setIsReload(!isReload);
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const columns: ProColumns<API.UserInfo>[] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      search: false,
      align: 'center',
      render: (_, record) => {
        return <Avatar src={record.avatar} icon={record.avatar ? <></> : <UserOutlined />} />;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      search: false,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      search: false,
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
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
                history.push(`/manage-users/detail/${row?.id}`);
              }}
            >
              <EyeOutlined />
            </div>
          </Tooltip>
          <Tooltip title={'Edit'}>
            <div
              className="icon-edit"
              onClick={() => {
                setIsOpenModalUser(true);
                setUserSelect(row);
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
                  title: <div>Confirm Remove User</div>,
                  content: 'Are you sure to delete this user?',
                  onOk: () => {
                    handleDeleteUser(row.id || '');
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
            name: 'Manage User',
            path: '',
          },
        ]}
      />
      <Button
        size="middle"
        type="primary"
        style={{ maxWidth: '15%', float: 'right' }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsOpenModalUser(true);
          form.resetFields();
        }}
      >
        Add New User
      </Button>
      <ProTable<
        API.UserInfo,
        API.SystemUserControllerGetInfoPageWithFilterParams & { isReload: boolean }
      >
        params={{ isReload }}
        headerTitle="Manage Groups Permission"
        options={{ search: false }}
        expandable={{ showExpandColumn: false }}
        rowKey="key"
        search={false}
        toolBarRender={false}
        request={async (params) => {
          const response = await SystemUserControllerGetInfoPageWithFilter(params);
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
      <ModalUser
        form={form}
        userInfo={userSelect}
        isOpen={IsOpenModalUser}
        setIsOpen={setIsOpenModalUser}
        handleCancel={() => {
          setIsOpenModalUser(false);
          setUserSelect(undefined);
          form.resetFields();
        }}
        handleOk={() => {
          form.validateFields().then((data) => {
            console.log(data);

            if (userSelect) {
              handleUpdateUser({
                id: userSelect.id,
                ...data,
              });
            } else {
              handleAddUser(data as API.UserDetailsCreate);
            }
          });
        }}
      />
    </>
  );
};

export default ManageUser;
