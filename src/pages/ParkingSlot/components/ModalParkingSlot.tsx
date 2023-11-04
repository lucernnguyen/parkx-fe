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
import React, { useEffect } from 'react';
import './style.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleOk?: () => void;
  handleCancel?: () => void;
  parkingSlot?: API.ParkingSlotInfo;
  form: FormInstance;
}

const ModalParkingSlot: React.FC<Props> = ({
  parkingSlot,
  isOpen,
  setIsOpen,
  handleCancel,
  handleOk,
  form,
}) => {
  useEffect(() => {
    form.setFieldsValue({
      name: parkingSlot?.name,
      rowIndex: parkingSlot?.rowIndex,
      columnIndex: parkingSlot?.columnIndex,
      hasParking: parkingSlot?.hasParking,
    });
  }, [parkingSlot]);

  return (
    <div className="custom-modal">
      <Modal
        className="custom-modal"
        title={parkingSlot ? 'Edit Parking Slot' : 'Add Parking Slot'}
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
              <Form.Item label="Row Index" name="rowIndex">
                <InputNumber width={100} min={0} />
              </Form.Item>
              <Form.Item label="Column Index" name="columnIndex">
                <InputNumber min={0} />
              </Form.Item>
            </Flex>
            <Form.Item
              label="Has Parking"
              required
              name="hasParking"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Select>
                <Select.Option value={true}>
                  <Space>
                    <Tag style={{ width: '130%', textAlign: 'center' }} color={'success'}>
                      {'Free'}
                    </Tag>
                  </Space>
                </Select.Option>
                <Select.Option value={false}>
                  <Space>
                    <Tag style={{ width: '130%', textAlign: 'center' }} color={'orange-inverse'}>
                      {'Not Fee'}
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

export default ModalParkingSlot;
