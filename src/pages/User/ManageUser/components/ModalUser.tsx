import { GENDER } from '@/constants';
import { SystemGroupControllerGetInfoPageWithFilter } from '@/services/api/SystemGroupController';
import { Card, DatePicker, Flex, Form, FormInstance, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleOk?: () => void;
  handleCancel?: () => void;
  userInfo?: API.UserInfo;
  form: FormInstance;
}

const ModalUser: React.FC<Props> = ({
  userInfo,
  isOpen,
  setIsOpen,
  handleCancel,
  handleOk,
  form,
}) => {
  const [groups, setGroups] = useState<API.GroupInfo[]>([]);

  const getAllGroup = async () => {
    const res = await SystemGroupControllerGetInfoPageWithFilter({ size: 999, number: 0 });
    if (res.success) {
      setGroups(res.data?.content || []);
    }
  };

  useEffect(() => {
    getAllGroup();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      id: userInfo?.id,
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      groupId: groups.find((data) => data.id === userInfo?.groupId)?.id,
    });
    console.log(groups.find((data) => data.id === userInfo?.groupId));
  }, [userInfo]);

  return (
    <div className="custom-modal">
      <Modal
        className="custom-modal"
        title={userInfo ? 'Edit User' : 'Add User'}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
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
            <Form.Item
              label="Email"
              required
              name="email"
              rules={[{ required: true, message: 'Email is required', type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Flex gap={8}>
              <Form.Item
                label="Phone"
                name="phone"
                required
                rules={[{ required: true, message: 'Phone is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Birthday" name="dateOfBirth">
                <DatePicker />
              </Form.Item>
            </Flex>
            <Flex gap={8}>
              <Form.Item label="Gender" name="gender">
                <Select>
                  <Select.Option value={GENDER.male}>{GENDER.male}</Select.Option>
                  <Select.Option value={GENDER.female}>{GENDER.female}</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Group" name="groupId">
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  options={groups.map((data) => {
                    return { label: data.name, value: data.id };
                  })}
                />
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalUser;
