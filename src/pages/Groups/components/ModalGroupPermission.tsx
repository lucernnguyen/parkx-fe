import { GROUPS_KIND } from '@/constants';
import { SystemPermissionControllerGetInfoListWithFilter } from '@/services/api/SystemPermissionController';
import { Card, Form, FormInstance, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleOk?: () => void;
  handleCancel?: () => void;
  groupInfo?: API.GroupInfo;
  form: FormInstance;
  permissionsDefault?: API.PermissionInfo[];
}

const ModalGroupPermission: React.FC<Props> = ({
  groupInfo,
  isOpen,
  setIsOpen,
  handleCancel,
  handleOk,
  form,
  permissionsDefault,
}) => {
  const [permissions, setPermissions] = useState<API.PermissionInfo[]>([]);

  const getAllPermissions = async () => {
    const res = await SystemPermissionControllerGetInfoListWithFilter({});
    if (res.success) {
      setPermissions(res.data || []);
    }
  };

  useEffect(() => {
    getAllPermissions();
  }, []);

  useEffect(() => {
    console.log('permissionsDefault: ', permissionsDefault);

    form.setFieldsValue({
      name: groupInfo?.name,
      kind: groupInfo?.kind,
      description: groupInfo?.description,
      permissions: permissionsDefault?.map((data) => {
        return { label: data.name, value: data.id };
      }),
    });
  }, [groupInfo, permissionsDefault]);

  return (
    <div className="custom-modal">
      <Modal
        className="custom-modal"
        title={groupInfo ? 'Edit Group Permission' : 'Add Group Permission'}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card>
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Name"
              required
              name="name"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Kind"
              required
              name="kind"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Select>
                <Select.Option value={GROUPS_KIND.supperAdmin}>
                  {GROUPS_KIND.supperAdmin}
                </Select.Option>
                <Select.Option value={GROUPS_KIND.cms}>{GROUPS_KIND.cms}</Select.Option>
                <Select.Option value={GROUPS_KIND.user}>{GROUPS_KIND.user}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Permission"
              required
              name="permissions"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                options={permissions.map((data) => {
                  return { label: data.name, value: data.id };
                })}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalGroupPermission;
