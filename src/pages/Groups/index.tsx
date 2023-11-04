import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {
  SystemGroupControllerCreateModel,
  SystemGroupControllerDeleteModelById,
  SystemGroupControllerGetInfoPageWithFilter,
  SystemGroupControllerUpdateModel,
} from '@/services/api/SystemGroupController';
import { SystemPermissionControllerGetInfoListWithFilter } from '@/services/api/SystemPermissionController';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, Modal, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import './Groups.less';
import ModalGroupPermission from './components/ModalGroupPermission';

const GroupsPermission: React.FC = () => {
  const intl = useIntl();
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [groupSelect, setGroupSelect] = useState<API.GroupInfo | undefined>();
  const [permissionSelect, setPermissionSelect] = useState<API.PermissionInfo[]>([]);

  const [form] = Form.useForm();

  const handleAddGroup = async (data: API.GroupDetailsCreate) => {
    const res = await SystemGroupControllerCreateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Add Group Permission Success',
      });
      setIsReload(!isReload);
      setIsOpenModalGroup(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const getPermissions = async (groupId: string) => {
    console.log(groupId);

    const res = await SystemPermissionControllerGetInfoListWithFilter({ groupId: groupId });
    console.log(res);

    if (res.success) {
      setPermissionSelect(res?.data || []);
    }
  };

  const handleUpdateGroup = async (data: API.GroupDetailsUpdate) => {
    const res = await SystemGroupControllerUpdateModel(data);
    if (res.success) {
      messageApi.open({
        type: 'success',
        content: 'Update Group Permission Success',
      });
      setIsReload(!isReload);
      setIsOpenModalGroup(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: res?.message,
      });
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    const res = await SystemGroupControllerDeleteModelById({ id: groupId });
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

  const columns: ProColumns<API.GroupInfo>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      search: false,
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      search: false,
      align: 'center',
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      search: false,
      align: 'center',
    },
    {
      title: 'Action',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => {
        if (row.defaultGroup) {
          return <></>;
        }
        return (
          <div className="actions">
            <Tooltip title={'Edit'}>
              <div
                className="icon-edit"
                onClick={() => {
                  setIsOpenModalGroup(true);
                  setGroupSelect(row);
                  getPermissions(row?.id || '');
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
                    content: 'Are you sure to delete this Group?',
                    onOk: () => {
                      handleDeleteGroup(row.id || '');
                    },
                  });
                }}
              >
                <DeleteOutlined />
              </div>
            </Tooltip>
          </div>
        );
      },
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
            name: 'Manage Groups Permission',
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
          setIsOpenModalGroup(true);
          form.resetFields();
        }}
      >
        Add Group Permission
      </Button>
      <ProTable<
        API.GroupInfo,
        API.SystemGroupControllerGetInfoPageWithFilterParams & { isReload: boolean }
      >
        params={{ isReload }}
        headerTitle="Manage Groups Permission"
        options={{ search: false }}
        expandable={{ showExpandColumn: false }}
        rowKey="key"
        search={false}
        toolBarRender={false}
        request={async (params) => {
          const response = await SystemGroupControllerGetInfoPageWithFilter(params);
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
      <ModalGroupPermission
        permissionsDefault={permissionSelect}
        groupInfo={groupSelect}
        form={form}
        isOpen={isOpenModalGroup}
        setIsOpen={setIsOpenModalGroup}
        handleCancel={() => {
          setIsOpenModalGroup(false);
          setGroupSelect(undefined);
        }}
        handleOk={() => {
          form.validateFields().then((data) => {
            if (groupSelect) {
              handleUpdateGroup({
                id: groupSelect.id,
                ...data,
              });
            } else {
              handleAddGroup(data as API.GroupDetailsCreate);
            }
          });
        }}
      />
    </>
  );
};

export default GroupsPermission;
