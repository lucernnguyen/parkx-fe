import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { SystemTransactionControllerGetDetailById } from '@/services/api/SystemTransactionController';
import { useParams } from '@umijs/max';
import { Card, Col, Image, Row, Tag, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './index.less';

interface Props {}

export default (props: Props) => {
  const {} = props;
  const [transaction, setTransaction] = useState<API.TransactionDetails | undefined>();
  const [group, setGroup] = useState<API.GroupInfo | undefined>();
  const [isReload, setIsReload] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { transactionId } = useParams();

  const getTransactionDetail = async () => {
    if (transactionId) {
      const res = await SystemTransactionControllerGetDetailById({ id: transactionId });
      if (res.success) {
        setTransaction(res.data);
      }
    }
  };

  useEffect(() => {
    getTransactionDetail();
  }, [transactionId, isReload]);
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
            name: 'Manage Transactions ',
            path: '/manage-transactions',
          },
          {
            name: 'Transaction Detail',
            path: '',
          },
        ]}
      />
      <Card
        className="cart-cus"
        title={<div className="title-card">User Detail</div>}
        style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Avatar: </p>
              <div className="custome-col">
                <Image
                  width={60}
                  height={60}
                  style={{ borderRadius: '50%' }}
                  src={transaction?.avatar ? transaction?.avatar : '/icons/Logo.png'}
                />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Full name: </p>
              <div className="custome-col">
                <p className="text"> {transaction?.name || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Birthday: </p>
              <div className="custome-col">
                <p className="text">
                  {transaction?.dateOfBirth
                    ? moment(transaction?.dateOfBirth).format('DD/MM/YYYY')
                    : '--'}
                </p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Gender: </p>
              <div className="custome-col">
                <p className="text">{transaction?.gender || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Phone:</p>
              <div className="custome-col">
                <p className="text">{transaction?.phone || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Email:</p>
              <div className="custome-col">
                <p className="text">{transaction?.email || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Address:</p>
              <div className="custome-col">
                <p className="text">{transaction?.address}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Status:</p>
              <div className="custome-col">
                <Tag className="text-tag" color={!transaction?.active ? 'error' : 'success'}>
                  {!transaction?.active ? 'Đã khóa' : 'Hoạt động'}
                </Tag>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Id Card No:</p>
              <div className="custome-col">
                <p className="text">{transaction?.idCardNo}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Issue By:</p>
              <div className="custome-col">
                <p className="text">{transaction?.idCardIssuedBy}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Issue Date:</p>
              <div className="custome-col">
                <p className="text">
                  {transaction?.idCardIssuedDate
                    ? moment(transaction?.idCardIssuedDate).format('DD/MM/YYYY')
                    : '--'}
                </p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Group Permission:</p>
              <div className="custome-col">
                <p className="text">{group?.name}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
