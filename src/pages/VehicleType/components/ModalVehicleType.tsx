import { SystemPermissionControllerGetInfoListWithFilter } from '@/services/api/SystemPermissionController';
import {
  Card,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleOk?: () => void;
  handleCancel?: () => void;
  vehicleType?: API.VehicleTypeInfo;
  form: FormInstance;
}

const ModalVehicleType: React.FC<Props> = ({
  vehicleType,
  isOpen,
  setIsOpen,
  handleCancel,
  handleOk,
  form,
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
    form.setFieldsValue({
      name: vehicleType?.name,
      price: vehicleType?.pricce,
      totalSlot: vehicleType?.totalSlot,
      active: vehicleType?.active,
    });
  }, [vehicleType]);

  return (
    <div className="custom-modal">
      <Modal
        className="custom-modal"
        title={vehicleType ? 'Edit Vehicle Type' : 'Add Vehicle Type'}
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
            <Flex justify="center" align="center" gap={6}>
              <Form.Item label="Total Slot" name="totalSlot">
                <InputNumber width={100} min={0} />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <InputNumber min={0} />
              </Form.Item>
            </Flex>
            <Form.Item
              label="Status"
              required
              name="active"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Select>
                <Select.Option value={true}>
                  <Space>
                    <Tag style={{ width: '130%', textAlign: 'center' }} color={'success'}>
                      {'ACTIVE'}
                    </Tag>
                  </Space>
                </Select.Option>
                <Select.Option value={false}>
                  <Space>
                    <Tag style={{ width: '130%', textAlign: 'center' }} color={'orange-inverse'}>
                      {'INACTIVE'}
                    </Tag>
                  </Space>
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalVehicleType;
